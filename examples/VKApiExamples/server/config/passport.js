/**
 * Passport configuration goes here
 */
import { storage } from '../mockStorage';
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
                scope: ['email'],
                profileFields: ['email'],
            },
            // verify
            (accessToken, refreshToken, params, profile, done) => {
                // TODO: Do the authentication here
                console.log('VkontakteStrategy middleware triggered...');

                // If user is not registred
                let user = storage.Users.filter(u => u.id === profile.id)[0];
                if (!user) {
                    user = {
                        id: profile.id,
                        name: profile.displayName,
                        accessToken, // I dont see how else can we get it
                    };
                    storage.Users.push(user);
                }

                return done(null, user, { message: 'some message' });
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
        // Get user from DB
        const user = storage.Users.filter(u => u.id === id)[0];
        done(null, user ? user : false);
    });
};
