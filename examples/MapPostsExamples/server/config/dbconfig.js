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

    static insertUser(user) {
        return new Promise((resolve, reject) => {
            // TODO: Find a way to do this in transaction. This implementation sucks
            this._db
                .run(
                    `insert into Users (id, email, fullName) values ($id, $email, $fullName);`,
                    {
                        $id: user.id,
                        $email: user.email,
                        $fullName: user.fullName,
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
            let posts = [];
            this._db
                .all(
                    'select p.id, p.text, p.timestamp, u.fullName as author, ph.url as userPic, pgp.latitude, pgp.longitude ' +
                        'from Posts p join Users u on p.userId = u.id join Photos ph on p.userId = ph.userId join PostGeoPositions pgp on p.id = pgp.postId',
                    (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            posts = [...rows];
                        }
                    }
                )
                .all('select p.id, i.name as imageName from Posts as p inner join Images as i', (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        posts.forEach(post => {
                            post.images = [];
                            rows.filter(row => post.id === row.id).forEach(row => {
                                post.images.push(row.imageName);
                            });
                        });
                        resolve(posts);
                    }
                });
        });
    }
}
