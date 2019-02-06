import os from 'os';
import express from 'express';

import type {
    $Request,
    $Response,
    // NextFunction,
    // Middleware,
} from 'express';

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req: $Request, res:$Response) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
