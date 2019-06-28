/** https://www.npmjs.com/package/sqlite3 */

import sqlite3 from 'sqlite3';
import { stat } from 'fs';
import { v4 as generateGuid } from 'uuid';

export default class Storage {
    static _dbLocation = './examples/MapPostsExamples/server/db.sqlite';
    static _db = new sqlite3.Database(Storage._dbLocation);

    static get Db() {
        return Storage._db;
    }

    static getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const sqlReq =
                'select u.id, u.email, u.fullName, p.url as photoUrl from Users u inner join Photos p on u.id=userId where u.email = $email';
            const sqlParams = { $email: email };
            const statement = this._db.prepare(sqlReq);
            statement.get(sqlParams, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }

    static getUserById(id) {
        return new Promise((resolve, reject) => {
            const sqlReq =
                'select u.id, u.email, u.fullName, p.url as photoUrl from Users u inner join Photos p on u.id=userId where u.id = $id';
            const sqlParams = { $id: id };
            const statement = this._db.prepare(sqlReq);
            statement.get(sqlParams, (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }

    static getUserAvatarById(id) {
        return new Promise((resolve, reject) => {
            this._db.get('select p.url as photoUrl from Users u inner join Photos p on u.id=p.userId where u.id=?', [id], (err, row) => {
                if (err) {
                    console.err(`[ERROR] ${err}`);
                    reject(err);
                }
                resolve(row.photoUrl);
            });
        });
    }

    static insertUser(user) {
        return new Promise((resolve, reject) => {
            // TODO: Find a way to do this in transaction. This implementation sucks
            this._db
                .run(
                    `insert into Users (id, email, fullName, vkProfileUrl) values ($id, $email, $fullName, $vkProfileUrl);`,
                    {
                        $id: user.id,
                        $email: user.email,
                        $fullName: user.fullName,
                        $vkProfileUrl: user.vkProfileUrl,
                    },
                    err => {
                        if (err) {
                            reject(err);
                        }
                    }
                )
                .run(
                    `insert into Photos (userId, url) values ($id, $url);`,
                    {
                        $id: user.id,
                        $url: user.photoUrl,
                    },
                    err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    }
                );
        });
    }

    static insertPost(post) {
        return new Promise((resolve, reject) => {
            this._db
                .run(
                    'insert into Posts (id, userId, text) values ($id, $userId, $text)',
                    {
                        $id: post.id,
                        $userId: post.userId,
                        $text: post.text,
                    },
                    err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    }
                )
                .run(
                    'insert into PostGeoPositions (postId, latitude, longitude) values ($postId, $latitude, $longitude)',
                    {
                        $postId: post.id,
                        $latitude: post.latitude,
                        $longitude: post.longitude,
                    },
                    err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    }
                );
            // TODO: Problem with lack of transactions is obvious here: User can create post, but images won't be saved if error occures
            if (post.images.length > 0) {
                const sql = 'insert into Images (rowId, postId, name) values' + post.images.map(imgName => ' (?,?,?)').join();
                const vals = [];
                post.images.forEach(imgName => {
                    // Looks like shit, but I couldn't find a way to do this in a less ugly way
                    vals.push(generateGuid());
                    vals.push(post.id);
                    vals.push(imgName);
                });

                this._db.run(sql, vals, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    }

    static getPosts() {
        return new Promise((resolve, reject) => {
            // TODO: no idea how to do this in one query
            /**
             * TODO: I think i caught a race condition here - promise may resolve before all of three queiries are executed.
             * Need to find a way to sync them or do it all in one transaction. I leave it like this for now
             * since this method is not in use at the current api version. May be there is a way to perform
             * a transaction here in more elegant way than callback-in-callback
             *  */

            let posts = [];
            this._db
                .all(
                    'select p.id, p.text, p.timestamp, u.fullName as author, ph.url as avatar, pgp.latitude, pgp.longitude ' +
                        'from Posts p join Users u on p.userId = u.id join Photos ph on p.userId = ph.userId join PostGeoPositions pgp on p.id = pgp.postId',
                    (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            posts = [...rows];
                        }
                    }
                )
                .all('select p.id, i.name as imageName from Posts as p inner join Images as i on p.id = i.postId', (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        posts.forEach(post => {
                            post.images = [];
                            rows.filter(row => post.id === row.id).forEach(row => {
                                post.images.push(row.imageName);
                            });
                        });
                    }
                })
                .all(
                    `select 
                        posts.id as postId, 
                        subs.id as subId, 
                        subs.email, 
                        subs.fullName, 
                        p.url as photoUrl 
                    from Posts posts 
                        join PostsSubscribersMap psm on posts.id = psm.postId 
                        join Users subs on psm.userId = subs.id 
                        left join Photos p on subs.id=p.userId;`,
                    (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            posts.forEach(post => {
                                const subs = [];
                                rows.filter(row => row.postId === post.id).forEach(row =>
                                    subs.push({
                                        email: row.email,
                                        fullName: row.fullName,
                                        photoUrl: row.photoUrl,
                                    })
                                );
                                post.subs = subs;
                            });
                            resolve(posts);
                        }
                    }
                );
        });
    }

    static getPostPositions() {
        return new Promise((resolve, reject) => {
            let posts = [];
            this._db.all(
                `select p.id, pgp.latitude, pgp.longitude 
                    from Posts p join PostGeoPositions pgp on p.id = pgp.postId`,
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        posts = [...rows];
                        resolve(posts);
                    }
                }
            );
        });
    }

    static getPostInfoById(postId) {
        return new Promise((resolve, reject) => {
            let post = {};
            this._db.get(
                `select p.id, 
                            p.text, 
                            p.timestamp, 
                            u.fullName as author, 
                            ph.url as avatar, 
                            pgp.latitude, 
                            pgp.longitude, 
                            s.subCount 
                    from Posts p 
                        join Users u on p.userId = u.id 
                        join Photos ph on p.userId = ph.userId 
                        join PostGeoPositions pgp on p.id = pgp.postId 
                        join ( 
                            select count(*) as subCount 
                            from Users u 
                            join PostsSubscribersMap pum on u.id = pum.userId 
                            join Posts p on p.id = pum.postId 
                            where p.id = $postId 
                        ) s 
                    where p.id = $postId `,
                {
                    $postId: postId,
                },
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        post = { ...row };
                        this._db.all(
                            'select i.name as imageName from Posts as p join Images as i on p.id = i.postId where p.id = $postId',
                            {
                                $postId: postId,
                            },
                            (err, rows) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    post.images = [];
                                    rows.forEach(row => {
                                        post.images.push(row.imageName);
                                    });
                                    resolve(post);
                                }
                            }
                        );
                    }
                }
            );
        });
    }

    static getCommentsByPostId(postId) {
        return new Promise((resolve, reject) => {
            this._db.all(
                `select c.id, c.authorId, u.fullName, p.url as photoUrl, c.replyToCommentId, ru.fullName as replyToName, c.text, c.timestamp 
                from Comments c inner join Users u on c.authorId=u.id inner join Photos p on u.id=p.userId left outer join Comments rc on c.replyToCommentId=rc.id left outer join Users ru on rc.authorId=ru.id 
                where c.postId=? 
                order by c.timestamp desc; `,
                [postId],
                (err, rows) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    static insertComment(comment) {
        const id = generateGuid();
        const { postId, authorId, text, replyToCommentId } = comment;

        return new Promise((resolve, reject) => {
            this._db.run(
                `insert into Comments 
                (id, postId, authorId, text, replyToCommentId) 
                values
                (?, ?, ?, ?, ?)`,
                [id, postId, authorId, text, replyToCommentId],
                err => {
                    if (err) {
                        console.error(`[ERROR] ${err}`);
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    // Updates only columns defined in comment. Leaves other columns unchanged
    static updateComment(comment) {
        return new Promise((resolve, reject) => {
            let sql = 'update Comments set ';
            let columns = [];
            let args = [];
            for (let key in comment) {
                if (comment[key]) {
                    if (key === 'id') {
                        args.push(comment[key]);
                    } else {
                        columns.push(`${key} = ?`);
                        args.unshift(comment[key]);
                    }
                }
            }
            if (columns.length === 0) {
                reject();
                return;
            }
            sql += columns.join(',');
            sql += ' where id=?;';

            this._db.run(sql, args, err => {
                if (err) {
                    console.error(`[ERROR] ${err}`);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static deleteCommentById(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`delete from Comments where id=?`, [id], err => {
                if (err) {
                    console.error(`[ERROR] ${err}`);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static getSubscribersByPostId(postId) {
        return new Promise((resolve, reject) => {
            this._db.all(
                `select u.id, u.email, u.fullName, u.vkProfileUrl, ph.url as avatar 
                from Users u 
                join PostsSubscribersMap pum on u.id = pum.userId 
                join Posts p on p.id = pum.postId 
                join Photos ph on ph.userId = u.id 
                where p.id = $postId `,
                {
                    $postId: postId,
                },
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    static getSubscribersCount(postId) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `select count(*) as subCount 
                from Users u 
                join PostsSubscribersMap pum on u.id = pum.userId 
                join Posts p on p.id = pum.postId 
                where p.id = $postId`,
                {
                    $postId: postId,
                },
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row.subCount);
                    }
                }
            );
        });
    }

    static checkSubscriptionStatus(userId, postId) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `select 1 
                from Users u 
                join PostsSubscribersMap pum on u.id = pum.userId 
                join Posts p on p.id = pum.postId 
                where p.id = $postId and u.id = $userId `,
                {
                    $postId: postId,
                    $userId: userId,
                },
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row ? true : false);
                    }
                }
            );
        });
    }

    // TODO: Use INSERT OR IGNORE instead?
    static subscribeUser(userId, postId) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `insert into PostsSubscribersMap (postId, userId) 
                 select $postId, $userId 
                 where not exists ( 
                      select * from PostsSubscribersMap 
                     where postId = $postId and userId = $userId 
                     );`,
                {
                    $postId: postId,
                    $userId: userId,
                },
                err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    static unsubscribeUser(userId, postId) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `delete from PostsSubscribersMap where postId = $postId and userId = $userId;`,
                {
                    $postId: postId,
                    $userId: userId,
                },
                err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }
}
