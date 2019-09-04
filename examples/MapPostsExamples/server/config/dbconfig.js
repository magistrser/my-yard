/** https://www.npmjs.com/package/sqlite3 */

/**
 * TODO:
 * There is a way to serialize/parallelize queries to avoid nested callbacks
 * https://www.sqlitetutorial.net/sqlite-nodejs/statements-control-flow/
 */

import sqlite3 from 'sqlite3';
import { stat } from 'fs';
import { v4 as generateGuid } from 'uuid';
import { withinArea, calcDistance } from '../utils/GeoDataUtils';

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
                'select u.id, u.email, u.fullName, u.isAdmin, p.url as photoUrl from Users u inner join Photos p on u.id=userId where u.id = $id';
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
                    'insert into Posts (id, userId, text, title, eventDateTime) values ($id, $userId, $text, $title, datetime($eventDateTime))',
                    {
                        $id: post.id,
                        $userId: post.userId,
                        $text: post.text,
                        $title: post.title,
                        $eventDateTime: post.eventDateTime,
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
            if (post.tags.length > 0) {
                const sqlInsertTags = `insert or ignore into Tags (name) values ${post.tags.map(tag => '(?)').join(', ')} ; `;
                const insertTagsArgs = post.tags.map(tag => `${tag}`);
                const sqlAddTagsToPost = `insert into PostsTagsMap select 
                    ? as postId, t.id as tagId from 
                    (select id from Tags where name in (${post.tags.map(tag => '?').join(', ')}) ) as t `;
                const addTagsToPostArgs = [post.id, ...insertTagsArgs];

                this._db.run(sqlInsertTags, insertTagsArgs, err => {
                    if (err) {
                        console.error('[ERROR] ', err);
                        reject(err);
                    } else {
                        this._db.run(sqlAddTagsToPost, addTagsToPostArgs, err => {
                            if (err) {
                                console.error('[ERROR] ', err);
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    }
                });
            }
        });
    }

    static deletePostByIdChecked(postId, userId) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `delete from Posts where id=? and ( userId=? or exists ( 
                    select 1 from Users where id=? and isAdmin > 0 
                 )) `,
                [postId, userId, userId],
                function(err) {
                    if (err) {
                        console.error(`[ERROR] ${err}`);
                        reject(err);
                    } else if (!this.changes) {
                        reject('No deleted rows');
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    static updatePostChecked(postId, updateData, userId) {
        return new Promise((resolve, reject) => {
            /* Update direct columns of Posts table: */
            let sql = 'update Posts set id = id '; // id=id for query to work if no colums need updating in Posts
            let sqlCheckCredentials =
                'where id = $postId and (userId = $userId or exists (select 1 from Users where id = $userId or isAdmin = 1)) ';
            let updatedColumnsParams = {
                $postId: postId,
                $userId: userId,
            };

            // Set columns to update
            let sqlUpdatedColumns = '';
            if (updateData.text) {
                sqlUpdatedColumns += ', text = $text ';
                updatedColumnsParams.$text = updateData.text;
            }
            if (updateData.title) {
                sqlUpdatedColumns += ', title = $title ';
                updatedColumnsParams.$title = updateData.title;
            }
            if (updateData.eventDateTime) {
                sqlUpdatedColumns += ', eventDateTime = datetime($eventDateTime) ';
                updatedColumnsParams.$eventDateTime = updateData.eventDateTime;
            }
            if (updateData.userId) {
                sqlUpdatedColumns += ', userId = $userId ';
                updatedColumnsParams.$userId = updateData.userId;
            }
            if (updateData.timestamp) {
                sqlUpdatedColumns += ', timestamp = datetime($timestamp) ';
                updatedColumnsParams.$timestamp = updateData.timestamp;
            }

            console.log(
                `*** Update Post ***
                SQL:
                    ${sql + sqlUpdatedColumns + sqlCheckCredentials}
                PARAMS:
`,
                updatedColumnsParams
            );
            this._db.run(sql + sqlUpdatedColumns + sqlCheckCredentials, updatedColumnsParams, function(err) {
                if (!this.changes) {
                    // No rows affected => id=id wasnt executed => insufficient cridentials
                    console.error('[ERROR] ', 'No rights to update post');
                    return reject(err);
                }
                // If we are here, user has sufficient cridentials, no need to check them again

                // Update post images and post tags
                /* You can't run multiple queries in one run(), and we have to resolve only when all queries are done,
                    so here comes tangled and uncomprehenceble code*/

                let sqlQueries = {};
                if (updateData.images) {
                    // Delete old images
                    const sqlDeleteOldImages = 'delete from Images where postId = ?; ';
                    const sqlDeleteOldImagesParams = [postId];
                    sqlQueries['deleteOldImages'] = {
                        sql: sqlDeleteOldImages,
                        params: sqlDeleteOldImagesParams,
                    };
                    // TODO: Need to somehow find unbound images and delete them
                    // Insert new images
                    let sqlInsertNewImagesParams = [];
                    const sqlInsertNewImages = `insert into Images (rowId, postId, name) values ${updateData.images
                        .map(name => {
                            const rowId = generateGuid();
                            // Push multible values
                            Array.prototype.push.call(sqlInsertNewImagesParams, rowId, postId, name);
                            return `(?, ?, ?)`;
                        })
                        .join(', ')}`;
                    sqlQueries['insertNewImages'] = {
                        sql: sqlInsertNewImages,
                        params: sqlInsertNewImagesParams,
                    };
                }
                if (updateData.tags) {
                    // Delete old tags
                    const sqlDeleteOldTags = `delete from PostsTagsMap where postId = ?; `;
                    const sqlDeleteOldTagsParams = [postId];
                    sqlQueries['deleteOldTags'] = {
                        sql: sqlDeleteOldTags,
                        params: sqlDeleteOldTagsParams,
                    };
                    // Insert new tags
                    let sqlInsertNewTagsParams = [];
                    const sqlInsertNewTags = `insert or ignore into Tags (name) values ${updateData.tags
                        .map(tag => {
                            sqlInsertNewTagsParams.push(tag);
                            return `(?)`;
                        })
                        .join(', ')}; `;
                    sqlQueries['insertNewTags'] = {
                        sql: sqlInsertNewTags,
                        params: sqlInsertNewTagsParams,
                    };
                    // Map new tags to post
                    let sqlMapNewTagsToPost = `insert into PostsTagsMap select
                            ? as postId, t.id as tagId from `;
                    let sqlMapNewTagsToPostParams = [postId];
                    sqlMapNewTagsToPost += `(select id from Tags where name in (${updateData.tags
                        .map(tag => {
                            sqlMapNewTagsToPostParams.push(tag);
                            return `?`;
                        })
                        .join(', ')}) ) as t; `;
                    sqlQueries['mapNewTagsToPost'] = {
                        sql: sqlMapNewTagsToPost,
                        params: sqlMapNewTagsToPostParams,
                    };
                }

                if (Object.keys(sqlQueries).length > 0) {
                    // Run corresponding sql query sequences in separate promises
                    const imagesPromise =
                        sqlQueries.deleteOldImages &&
                        new Promise((resolve, reject) => {
                            const { deleteOldImages, insertNewImages } = sqlQueries;
                            Storage.Db.run(deleteOldImages.sql, deleteOldImages.params, err => {
                                if (err) reject(err);
                                else {
                                    Storage.Db.run(insertNewImages.sql, insertNewImages.params, err => {
                                        if (err) reject(err);
                                        else resolve();
                                    });
                                }
                            });
                        });
                    const tagsPromise =
                        sqlQueries.deleteOldTags &&
                        new Promise((resolve, reject) => {
                            const { deleteOldTags, insertNewTags, mapNewTagsToPost } = sqlQueries;
                            Storage.Db.run(deleteOldTags.sql, deleteOldTags.params, err => {
                                if (err) reject(err);
                                else {
                                    Storage.Db.run(insertNewTags.sql, insertNewTags.params, err => {
                                        if (err) reject(err);
                                        else {
                                            Storage.Db.run(mapNewTagsToPost.sql, mapNewTagsToPost.params, err => {
                                                if (err) reject(err);
                                                else resolve();
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    (async () => {
                        if (imagesPromise) {
                            await imagesPromise;
                        }
                        if (tagsPromise) {
                            await tagsPromise;
                        }
                    })()
                        .then(resolve)
                        .catch(err => reject(err));
                } else {
                    // No image or tag update is required, just resolve
                    resolve();
                }
            });
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
                    'select p.id, p.title, p.text, p.timestamp, p.eventDateTime, u.fullName as author, ph.url as avatar, pgp.latitude, pgp.longitude ' +
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
                        console.error('[ERROR] ', err);
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
                    `select p.id as postId, t.name as tagName 
                    from Posts p 
                    inner join PostsTagsMap ptm on p.id = ptm.postId 
                    inner join Tags t on ptm.tagId = t.id; `,
                    (err, rows) => {
                        if (err) {
                            console.error('[ERROR] ', err);
                            reject(err);
                        } else {
                            posts.forEach(post => {
                                post.tags = [];
                                rows.filter(row => post.id === row.postId).forEach(row => {
                                    post.tags.push(row.tagName);
                                });
                            });
                        }
                    }
                )
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

    // Gets minimal information about post (not only positions) TODO: What does RESTful paradigm think about it?
    static getPostPositions() {
        return new Promise((resolve, reject) => {
            let posts = [];
            this._db.all(
                `select p.id, p.eventDateTime, pgp.latitude, pgp.longitude 
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
                        p.title, 
                        p.text, 
                        p.timestamp,
                        p.eventDateTime, 
                        p.userId as authorId, 
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
                                    console.error('[ERROR] ', err);
                                    reject(err);
                                } else {
                                    post.images = [];
                                    rows.forEach(row => {
                                        post.images.push(row.imageName);
                                    });
                                    this._db.all(
                                        `select t.name as tagName 
                                        from Posts p 
                                        inner join PostsTagsMap ptm on p.id = ptm.postId 
                                        inner join Tags t on ptm.tagId = t.id 
                                        where p.id = ?; `,
                                        postId,
                                        (err, rows) => {
                                            if (err) {
                                                console.error('[ERROR] ', err);
                                                reject(err);
                                            } else {
                                                post.tags = [];
                                                rows.forEach(row => {
                                                    post.tags.push(row.tagName);
                                                });
                                                resolve(post);
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            );
        });
    }

    static searchPosts(searchQuery) {
        return new Promise((resolve, reject) => {
            const {
                tags,
                date,
                timeRange,
                participantsRange,
                distanceInfo,
                showEndedSearchResults,
                authenticatedUserFilters,
            } = searchQuery;

            let sqlSelect = `select p.id as postId, p.title, p.text, p.eventDateTime, ifnull(psmcount.subCount, 0) as subCount ${
                distanceInfo ? ', pgp.latitude, pgp.longitude' : ''
            } from Posts p `;
            let sqlWhere = 'where 1 ';
            let sqlParams = [];

            // TODO: Joins to deliver more data. Delete commented out code when certain that nothing explodes (and write some damn unit tests)
            sqlSelect += `left join ( select postId, count(1) as subCount from PostsSubscribersMap group by postId) psmcount on psmcount.postId = p.id `;

            // Build a search query to filter by all requested params possible
            if (authenticatedUserFilters) {
                const { ownEventsOnly, subscribedToEventsOnly, userId } = authenticatedUserFilters;
                if (ownEventsOnly) {
                    sqlWhere += ` and p.userId = ? `;
                    sqlParams = [...sqlParams, userId];
                }
                if (subscribedToEventsOnly) {
                    sqlSelect += `join (select * from PostsSubscribersMap where PostsSubscribersMap.userId = ?) psmaux on psmaux.postId = p.id `;
                    sqlParams = [userId, ...sqlParams];
                }
            }
            if (tags) {
                sqlSelect += 'left join PostsTagsMap ptm on p.id = ptm.postId left join Tags t on ptm.tagId = t.id ';
                sqlWhere += `and t.name in (${tags.map(tag => '?').join(', ')}) `;
                sqlParams = [...sqlParams, ...tags];
            }
            if (date || timeRange) {
                // Default timerage
                let fromTime = '00:00:00';
                let toTime = '23:59:59';

                // if timerange filter is required and parameters are valid numbers, set timerange parameters accordingly
                if (timeRange && timeRange.every(val => Number(val) >= 0 && Number(val) <= 24)) {
                    const fromHours = timeRange[0];
                    const toHours = timeRange[1];
                    fromTime = fromHours === 24 ? '23:59:59' : `${fromHours.toString().padStart(2, '0')}:00:00`;
                    toTime = toHours === 24 ? '23:59:59' : `${toHours.toString().padStart(2, '0')}:00:00`;
                }

                sqlWhere += `and ${
                    date
                        ? 'strftime("%s", p.eventDateTime)' // If date is specified, compare times since epoch
                        : 'strftime("%s", time(p.eventDateTime))' // If not - time of day
                } between strftime("%s", ?) and strftime("%s", ?) `;
                sqlParams = [...sqlParams, `${date || ''} ${fromTime}`.trim(), `${date || ''} ${toTime}`.trim()];
            }
            if (participantsRange) {
                sqlSelect +=
                    'left join (select postId, count(*) as subCount from PostsSubscribersMap group by postId) s on s.postId = p.id ';
                sqlWhere += `and (s.subCount between ? and ? ${participantsRange.includes(0) ? 'or s.subCount is null' : ''}  ) `; // zero participants = NULL in subCount
                sqlParams = [...sqlParams, ...participantsRange.sort((a, b) => a - b).slice(0, 2)]; // TODO: Redundant check?
            }
            if (distanceInfo) {
                // There is no way to put that check into sql (without stored procedures at least, which is not a thing in sqlite)
                sqlSelect += 'left join PostGeoPositions pgp on p.id = pgp.postId ';
            }
            if (!showEndedSearchResults) {
                sqlWhere += `and strftime('%s', p.eventDateTime) > strftime('%s', CURRENT_DATE) `;
            }

            console.log('[INFO] Search request:', '\nSQL query: ', sqlSelect + sqlWhere, '\nSQL params: ', sqlParams);
            this._db.all(sqlSelect + sqlWhere, sqlParams, (err, rows) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    // Filter by parameters not included into sql filters
                    if (distanceInfo) {
                        const { currentPosition, radius } = distanceInfo;
                        rows = rows
                            .filter(row =>
                                withinArea(currentPosition, Number(radius), {
                                    latitude: row.latitude,
                                    longitude: row.longitude,
                                })
                            )
                            // Add distance to results
                            .map(row => {
                                row.distance = calcDistance(currentPosition, {
                                    latitude: row.latitude,
                                    longitude: row.longitude,
                                });
                                return row;
                            });
                    }

                    resolve(rows);
                }
            });
        });
    }

    static getCommentsByPostId(postId) {
        return new Promise((resolve, reject) => {
            this._db.all(
                `select c.id, c.authorId, u.fullName, p.url as photoUrl, c.replyToCommentId, ru.fullName as replyToName, c.text, c.timestamp 
                from Comments c inner join Users u on c.authorId=u.id left outer join Photos p on u.id=p.userId left outer join Comments rc on c.replyToCommentId=rc.id left outer join Users ru on rc.authorId=ru.id 
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
    static updateCommentChecked(comment, userId) {
        return new Promise((resolve, reject) => {
            // Build query
            let sql = 'update Comments set ';
            let columns = [];
            let args = [];
            for (let key in comment) {
                // TODO: check what happens when value is null (should set NULL in db)
                if (comment[key] !== undefined) {
                    if (key === 'id') {
                        args.push(comment[key]);
                    } else {
                        columns.unshift(`${key} = ?`);
                        args.unshift(comment[key]);
                    }
                }
            }
            if (columns.length === 0) {
                reject('Post is unchanged');
                return;
            }
            sql += columns.join(',');
            sql += ' where id=?';
            // Add permissions validation
            args.push(userId);
            sql += ' and authorId=?'; // TODO: + ' or exists (select 1 from Users here id=? and isAdmin=1)'
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

    static deleteCommentByIdChecked(commentId, userId) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `delete from Comments where id=?1 and authorId=?2 
                or exists (select 1 from Users where id=?2);`, //and isAdmin=1
                [commentId, userId],
                // not lambda because brilliant sqlite3 developer decided that passing data to callback using THIS is very conveniant
                function(err) {
                    if (err) {
                        console.error(`[ERROR] ${err}`);
                        reject(err);
                    } else if (!this.changes) {
                        reject('No deleted rows');
                    } else {
                        resolve();
                    }
                }
            );
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

// Turn on foreign key constraints
Storage._db.get('PRAGMA foreign_keys = ON');
