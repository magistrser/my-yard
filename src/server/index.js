import os from 'os';
import express from 'express';
import path from 'path';

import type {
    $Request,
    $Response,
    NextFunction,
    Middleware,
} from 'express';

const app = express();
const rootFolder = path.join(__dirname, '..', '..');

app.use(express.static('dist'));

app.get('/api/getExampleHtml', (req: $Request, res: $Response) => {
    res.sendFile(path.join(rootFolder, 'public', 'iFrameContent.html'));
});

// Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.resolve(rootFolder, "dist", "index.html"));
// });

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
