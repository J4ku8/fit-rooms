import express, {Express} from 'express';
import helmet from 'helmet';
import bodyParser from "body-parser";
import {KosApi} from "./controller/kos-api/kos-routes";
import {TokenManager} from "./auth/oauth2";

const app: Express = express();


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const kosApiHandler = new KosApi();

(async () => {
    const data = await kosApiHandler.getParallels();
})();

export default app;
