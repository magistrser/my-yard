/**
 * Passport configuration goes here
 */
import { storage } from '../mockStorage';
import Storage from './dbconfig';
import secrets from '../config/secrets';
import { Strategy as VKontakteStrategy } from 'passport-vkontakte';
import { v4 as generateGuid } from 'uuid';

export default passport => {
    passport.use(
        new VKontakteStrategy(
            // options
            {
                clientID: secrets.appID,
                clientSecret: secrets.secretKey,
                callbackURL: 'http://localhost:8080/api/auth/vkontakte/callback',
                scope: ['email', 'photos'],
                profileFields: ['email'],
            },
            // verify
            async (accessToken, refreshToken, params, profile, done) => {
                console.log('VkontakteStrategy middleware triggered...');

                // TODO: Probably we should verify token

                try {
                    let user = await Storage.getUserByEmail(params.email);
                    if (!user) {
                        // User does not exist
                        user = {
                            id: generateGuid(),
                            email: params.email,
                            fullName: profile.displayName,
                            photoUrl: profile.photos[0].value, // Save img url from vk storage for now
                        };
                        Storage.insertUser(user);
                    }
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
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

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Storage.getUserById(id);
            return done(null, user ? user : false);
        } catch (err) {
            return done(err);
        }
    });
};
