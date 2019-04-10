import os from 'os';
import express from 'express';
import path from 'path';
import url from 'url';
import http from 'http';
import https from 'https';
import axios from 'axios';
import passport from 'passport';
import session from 'express-session';
import configurePassport from './config/passport';
import secrets from './config/secrets';

import type { $Request, $Response, NextFunction, Middleware } from 'express';

const app = express();

// Post request bodyparser
app.use(express.json());

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

// Passport configuration
configurePassport(passport);
// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dist'));

// Passport auth:
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

// Two following endpoins added only for logging:
// If auth succeeds:
app.get('/api/success', (req, res) => {
    console.log('<<Auth succeeded>>');
    res.redirect('http://localhost:80/');
});
// If auth fails:
app.get('/api/fail', (req, res) => {
    console.log('<<Auth failed>>');
    res.redirect('http://localhost:80/');
});

// Checks if user is authenticated
app.get('/api/check-authentication', (req, res) => {
    const isAuthenticated = req.isAuthenticated();
    res.send({ isAuthenticated });
});

// Logs user out
app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/passport');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    //res.sendFile(path.resolve(rootFolder, 'dist', 'index.html'));
    res.redirect('http://localhost:80/' + req.query); // HACK: A workaround
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

// Middleware that checks if user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/fail');
}
