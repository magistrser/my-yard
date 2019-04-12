/** https://www.npmjs.com/package/sqlite */

import sqlite3 from 'sqlite3';

export default class Storage {
    static _dbLocation = './examples/InfrastructureExamples/server/db.sqlite';
    static _db = new sqlite3.Database(Storage._dbLocation);

    static get Db() {
        return Storage._db;
    }
}
