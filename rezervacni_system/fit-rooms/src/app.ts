import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
// import compression from 'compression';
import compressFilter from './utils/compressFilter.util';
import config from './config/config';
// import cors from 'cors';

const app: Express = express();
//
// app.use(
//     cors({
//         origin: [config.cors_origin],
//         credentials: true,
//     })
// );

// Helmet is used to secure this app by configuring the http-header
app.use(helmet());

// app.use(compression({ filter: compressFilter }));

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
});

export default app;
