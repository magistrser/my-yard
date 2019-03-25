import os from 'os';
import express from 'express';
import path from 'path';
import url from 'url';
import http from 'http';
import https from 'https';

import type { $Request, $Response, NextFunction, Middleware } from 'express';

const app = express();
const rootFolder = path.join(__dirname, '..', '..');

app.use(express.static('dist'));

app.get('/api/getExampleHtml', (req: $Request, res: $Response) => {
    res.sendFile(path.join(rootFolder, 'public', 'iFrameContent.html'));
});

app.get('/api/getToken', (req, res) => {
    const code = req.query.code;
    const queryUrl =
        'https://oauth.vk.com/access_token?' +
        '&client_id=6907668' + // Our app ID
        '&client_secret=wJVp247QPfcwcLdAeUjB' + // Our secret key
        '&redirect_uri=http://localhost:3000/api/getToken' + // Exactly the same uri that we used on client-side
        `&code=${code}`; // code we got from clinet-side
    https.get(queryUrl, response => {
        response.on('data', data => {
            const response = JSON.parse(data);
            res.send(response);
        });
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.resolve(rootFolder, 'dist', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
