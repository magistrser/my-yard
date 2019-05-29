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
import { v4 as generateGuid } from 'uuid';
import sqlite3 from 'sqlite3';
import Storage from './config/dbconfig';
import ImageManager from './utils/ImageManager';
import multer from 'multer';

import { $Request, $Response, NextFunction, Middleware } from 'express';

const app = express();

/* Body parser middleware */
app.use(express.json());
app.use(express.urlencoded());
/* Session middleware */
app.use(
    session({
        secret: 'secret', // TODO: Generate guid or something
        resave: true,
        saveUninitialized: true,
    })
);

/* File uploading middleware */
const upload = multer({ storage: multer.memoryStorage() });

/* Passport configuration */
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

/* Serve static files */
app.use(express.static('dist'));
app.use('/api/img', express.static(`${__dirname}/__images`));

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

// Sends userpic by userId
app.get('/api/get-userpic/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await Storage.getUserById(userId);
    if (user) {
        res.redirect(user.photoUrl);
    } else {
        res.status(404).send();
    }
});

// Creates new post
app.post('/api/create-post', ensureAuthenticated, upload.array('images', 10), async (req, res) => {
    // TODO: Should we save images from here and pass names to database helper class
    // or should we pass images to database helper class and it should save them itself?

    const postId = generateGuid();
    const images = [];
    try {
        const imageArray = req.files.map(file => {
            if (file.size > 99999999) {
                // Do something about files that are too large
            }
            return file.buffer;
        });
        for (let imgBuf of imageArray) {
            const imageName = await ImageManager.saveImage(imgBuf);
            images.push(imageName);
        }
    } catch {
        res.status(500).send();
        return;
    }

    const post = {
        id: postId,
        userId: req.user.id,
        text: req.body.text,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        images,
    };
    try {
        await Storage.insertPost(post);
    } catch (err) {
        console.error('[ERROR] ', err);
        res.status(500).end('Error occured during post insertion');
        return;
    }

    res.redirect('back');
});

/**
 * Posts
 */
app.get('/api/get-posts', async (req, res) => {
    try {
        const posts = await Storage.getPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).send();
    }
});

app.get('/api/get-post-positions', async (req, res) => {
    try {
        const postPositions = await Storage.getPostPositions();
        res.json(postPositions);
    } catch (err) {
        console.error('[ERROR] ', err);
        res.status(500).send();
    }
});

app.get('/api/get-post-info', async (req, res) => {
    try {
        const postId = req.query.id;
        const postInfo = await Storage.getPostInfoById(postId);
        res.json(postInfo);
    } catch (err) {
        console.error('[ERROR] ', err);
        res.status(500).send();
    }
});

app.get('/api/get-subscribers', async (req, res) => {
    try {
        const postId = req.query.id;
        const postInfo = await Storage.getSubscribersByPostId(postId);
        res.json(postInfo);
    } catch (err) {
        console.error('[ERROR] ', err);
        res.status(500).send();
    }
});

// Image debug route
app.get('/api/img-debug', async (req, res) => {
    const imgResponse = await axios.get('https://pp.userapi.com/c844417/v844417738/1f5a01/pQyVzijwg-I.jpg', {
        responseType: 'arraybuffer',
    });
    const name = await ImageManager.saveImage(imgResponse.data);
    try {
        const savedImage = await ImageManager.getImageByName(name);
        res.contentType('jpg');
        res.end(savedImage, 'binary');
    } catch (err) {
        res.status('404').send();
    }
});

/**
 * Subscriptions
 */

// Subscribe user
app.post('/api/subscribe', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const postId = req.body.postid;
    try {
        await Storage.subscribeUser(userId, postId);
    } catch (err) {
        console.error('[ERROR] ', err);
        res.status(500).end('Could not subscribe user');
        return;
    }
    console.info('[INFO] ', 'Successfully subscribed');
    res.status(200).end('User successfuly subscribed');
});

// Unsubscribe user
app.post('/api/unsubscribe', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const postId = req.body.postid;
    try {
        await Storage.unsubscribeUser(userId, postId);
    } catch (err) {
        console.error('[ERROR] ', err);
        res.status(500).end('Could not unsubscribe user');
        return;
    }
    console.info('[INFO] ', 'Successfully unsubscribed');
    res.status(200).end('User successfuly unsubscribed');
});

app.get('/api/check-subscription-status', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.query.postid;
        const isSubscribed = await Storage.checkSubscriptionStatus(userId, postId);
        res.json({
            subscribed: isSubscribed,
        });
    } catch (err) {
        console.error('[ERROR] ', err);
        res.status(500).end();
        return;
    }
});

app.get('/api/get-subscribers-count', async (req, res) => {
    try {
        const postId = req.params.postid;
        const subCount = await getSubscribersCount(postId);
        res.json({
            subCount,
        });
    } catch (err) {
        console.error('[ERROR] ', err);
        res.status(500).end();
        return;
    }
});
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.redirect('http://localhost:80/'); // HACK: A workaround
});

/**
 *  Start web server
 * */
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

// Middleware that checks if user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/fail');
}
