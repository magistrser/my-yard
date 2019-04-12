/**
 * Passport configuration goes here
 */
import { storage } from '../mockStorage';
import Storage from './dbconfig';
import secrets from '../config/secrets';
import { Strategy as VKontakteStrategy } from 'passport-vkontakte';
import { v4 } from 'uuid';

export default passport => {
    passport.use(
        new VKontakteStrategy(
            // options
            {
                clientID: secrets.appID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
                clientSecret: secrets.secretKey,
                callbackURL: 'http://localhost:8080/api/auth/vkontakte/callback',
                scope: ['email', 'photos'],
                profileFields: ['email'],
            },
            // verify
            (accessToken, refreshToken, params, profile, done) => {
                console.log('VkontakteStrategy middleware triggered...');

                // TODO: Probably we should verify token

                const sqlReq =
                    'select u.id, u.email, u.fullName, p.url as photoUrl from Users u inner join Photos p on u.id=userId where u.email = $email';
                const sqlParams = { $email: params.email };
                const statement = Storage.Db.prepare(sqlReq);
                statement.all(sqlParams, (err, rows) => {
                    if (err) {
                        return done(err);
                    }
                    if (rows.length === 0) {
                        // User does not exist

                        const user = {
                            id: v4(),
                            email: params.email,
                            fullName: profile.displayName,
                            photoUrl: profile.photos[0].value,
                        };
                        // For some reason this thing refuses to work with transactions or execute more than one given query
                        const sqlStoreUser = `begin transaction;
                        insert into Users (id, email, fullName) values ('${user.id}', '${user.email}', '${user.fullName}');
                        insert into Photos (userId, url) values ('${user.id}', '${user.photoUrl}');
                        commit;`;
                        // Usless:
                        // const sqlStoreUserParams = {
                        //     $id: user.id,
                        //     $email: user.email,
                        //     $fullName: user.fullName,
                        // };

                        // I guess we can leave it like this, its safe unless VK team will consider to hack our app with sql injection
                        Storage.Db.exec(sqlStoreUser, err => {
                            if (err) {
                                console.log('SQL ERR', err);
                                return done(err);
                            } else {
                                return done(null, user);
                            }
                        });
                    } else {
                        // User exists
                        const user = rows[0];
                        console.log('USER EXISTS>>', user);
                        return done(null, user);
                    }
                });

                // let user = storage.Users.filter(u => u.id === profile.id)[0];
                // if (!user) {
                //     user = {
                //         id: profile.id,
                //         name: profile.displayName,
                //         accessToken, // I dont see how else can we get it
                //     };
                //     storage.Users.push(user);
                // }

                // return done(null, user, { message: 'some message' });
            }
        )
    );
    /* To support persistent login sessions, Passport needs to be able to
     * serialize users into and deserialize users out of the session.  Typically,
     * this will be as simple as storing the user ID when serializing, and finding
     * the user by ID when deserializing.
     */
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        // TODO: Do something with shitcode. Make methods for queries, make rest api. Something.
        const sqlReq =
            'select u.id, u.email, u.fullName, p.url as photoUrl from Users u inner join Photos p on u.id=userId where u.id = $id';
        const sqlParams = { $id: id };
        const statement = Storage.Db.prepare(sqlReq);
        statement.all(sqlParams, (err, rows) => {
            if (err) {
                done(err);
            }
            const user = rows[0];
            done(null, user ? user : false);
        });

        // // Get user from DB
        // const user = storage.Users.filter(u => u.id === id)[0];
        // done(null, user ? user : false);
    });
};
