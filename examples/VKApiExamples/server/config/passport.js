/**
 * Passport configuration goes here
 */
import secrets from '../config/secrets';
const VKontakteStrategy = require('passport-vkontakte').Strategy; // TODO: something like import {Strategy} from ...

export default passport => {
    passport.use(
        new VKontakteStrategy(
            // options
            {
                clientID: secrets.appID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
                clientSecret: secrets.secretKey,
                callbackURL: 'http://localhost:8080/api/auth/vkontakte/callback',
            },
            // verify
            (accessToken, refreshToken, params, profile, done) => {
                // TODO: Do the authentication here
                console.log('VkontakteStrategy middleware triggered...');
                console.log('accessToken: ', accessToken);
                console.log('refreshToken: ', refreshToken);
                console.log('params: ', params);
                console.log('profile: ', profile);

                return done(null, null, { message: 'Authorization is not implemented' });
            }
        )
    );
};
