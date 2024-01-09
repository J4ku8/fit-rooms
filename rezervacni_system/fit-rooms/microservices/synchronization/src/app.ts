import express, {Express} from 'express';
import helmet from 'helmet';
import bodyParser from "body-parser";
import initCrons from "./midleware/cron";
import {KosApi} from "./controller/cvut-kos/KosRoutes";

const app: Express = express();


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initCrons()

const kosApiHandler = new KosApi();

(async () => {
    const data = await kosApiHandler.getParallels();
})();

export default app;
