import os from 'os';
import express from 'express';
import path from 'path';
import url from 'url';
import http from 'http';
import https from 'https';
import axios from 'axios';

import type { $Request, $Response, NextFunction, Middleware } from 'express';

import passport from 'passport';
import session from 'express-session';
import configurePassport from './config/passport';

const app = express();
const rootFolder = path.join(__dirname, '..', '..', '..');

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

configurePassport(passport);

app.use(express.static('dist'));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/getToken', (req, res) => {
    const code = req.query.code;
    const queryUrl =
        'https://oauth.vk.com/access_token?' +
        '&client_id=6907668' + // Our app ID
        '&client_secret=zf6g1HUZdbqJCzbqtq0N' + // Our secret key
        '&redirect_uri=http://localhost/api/getToken' + // Exactly the same uri that we used on client-side
        `&code=${code}`; // code we got from clinet-side
    https.get(queryUrl, response => {
        response.on('data', data => {
            // Parse json from response:
            const jsonResponse = JSON.parse(data);
            // Print out json body:
            res.write('Server responded with:\n');
            res.write(Object.keys(jsonResponse).reduce((acc, i) => (acc += `${i} = ${jsonResponse[i]} \n`), ''));
            res.write('\n');
            const token = jsonResponse['access_token'];
            // We aquired new token along with user id (and email if we asked for it).
            // We can validate this token by api call. Generic api call looks like this:
            // https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V

            //secure.checkToken (https://vk.com/dev/secure.checkToken) won't work because "application type is not standalone"
            //const apiReq = `https://api.vk.com/method/secure.checkToken?token=${token}&v=5.92&access_token=6f20ab596f20ab596f20ab59ea6f49cc4d66f206f20ab5933b2deca56e66ad2cb25d04a`;

            // users.get with token should return only one user posessing this token:
            const apiReq = `https://api.vk.com/method/users.get?access_token=${token}&v=5.92)`;
            res.write(`Sending request to ${apiReq}...\n`);
            axios
                .get(apiReq)
                .then(resp => res.write(JSON.stringify(resp.data)))
                .then(x => res.end());
        });
    });
});

/**
 * Passport auth:
 */

// First step. Redirects to vk.com for authentication
app.get('/api/auth/vkontakte', passport.authenticate('vkontakte'));

// Second step. vk.com redirects back here after authentication
app.get(
    '/api/auth/vkontakte/callback',
    passport.authenticate('vkontakte', { failureRedirect: '/api/fail' }), // Redirect to /login page for example
    (req, res) => {
        // Successful authentication
        console.log('User: ', req.user); // { id, name }
        console.log('Session: ', req.session); // { passport: { user: <id> } }
        console.log('AuthInfo: ', req.authInfo); // { message: 'some message' }
        res.redirect('/api/success'); // Redirect to homepage.
    }
);

// Endpoint which will respond only if user is authorized
app.get('/api/restricted-area', ensureAuthenticated, (req, res) => {
    const username = req.user.name;
    res.send(`${username} is authorized`);
});

// If auth succeeds:
app.get('/api/success', (req, res) => {
    res.send('success');
});
// If auth fails:
app.get('/api/fail', (req, res) => {
    res.send('fail');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.resolve(rootFolder, 'dist', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/fail');
}
