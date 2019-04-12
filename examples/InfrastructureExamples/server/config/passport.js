/**
 * Passport configuration goes here
 */
import { storage } from '../mockStorage';
import Storage from './dbconfig';
import secrets from '../config/secrets';
import { Strategy as VKontakteStrategy } from 'passport-vkontakte';

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

                const sqlReq = 'select email, fullName from Users where email = $email';
                const sqlParams = { $email: params.email };
                const statement = Storage.Db.prepare(sqlReq);
                statement.all(sqlParams, (err, rows) => {
                    if (err) {
                        return done(err);
                    }
                    if (rows.length === 0) {
                        // User does not exist
                        const user = {
                            email: params.email,
                            fullName: profile.displayName,
                        };
                        const sqlStoreUser = 'insert into Users (email, fullName) values ($email, $fullName)';
                        const sqlStoreUserParams = { $email: user.email, $fullName: user.fullName };
                        Storage.Db.run(sqlStoreUser, sqlStoreUserParams, err => {
                            if (err) {
                                return done(err);
                            } else {
                                return done(null, user);
                            }
                        });
                    } else {
                        // User exists
                        const user = rows[0];
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
        done(null, user.email);
    });

    passport.deserializeUser((email, done) => {
        // TODO: Do something with shitcode. Make methods for queries, make rest api. Something.
        const sqlReq = 'select email, fullName from Users where email = $email';
        const sqlParams = { $email: email };
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
