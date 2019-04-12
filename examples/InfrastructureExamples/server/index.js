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
// Database
import sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import Storage from './config/dbconfig';

import type { $Request, $Response, NextFunction, Middleware } from 'express';

const app = express();

/* Body parser middleware */
app.use(express.json());

/* Session middleware */
app.use(
    session({
        secret: 'secret', // TODO: Generate guid or something
        resave: true,
        saveUninitialized: true,
    })
);

/* Passport configuration */
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

/* Serve static files */
app.use(express.static('dist'));

/* Passport authentication */
// VK strat:
app.get('/api/auth/vkontakte', passport.authenticate('vkontakte'));
app.get(
    '/api/auth/vkontakte/callback',
    passport.authenticate('vkontakte', { failureRedirect: '/api/fail' }), // Redirect to /login page for example
    (req, res) => {
        // Successful authentication
        res.redirect('/api/success'); // Redirect to homepage.
    }
);

/* ROUTES */
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
    res.redirect('http://localhost:80/');
});

app.get('/api/db', async (req, res) => {
    res.send('Done');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.redirect('http://localhost:80/' + req.query); // HACK: A workaround
});

/* Start web server */
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

// Middleware that checks if user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/fail');
}
