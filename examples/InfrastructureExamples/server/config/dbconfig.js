/** https://www.npmjs.com/package/sqlite3 */

import sqlite3 from 'sqlite3';
import { stat } from 'fs';

export default class Storage {
    static _dbLocation = './examples/InfrastructureExamples/server/db.sqlite';
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
            this._db.run(
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
                        // TODO: Figure out if this callback is called if no err was thrown

                        resolve();
                    }
                }
            );
        });
    }
}
