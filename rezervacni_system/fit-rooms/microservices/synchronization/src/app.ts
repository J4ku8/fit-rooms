import express, {Express} from 'express';
import helmet from 'helmet';
import bodyParser from "body-parser";
import {KosApi} from "./controller/kos-api/kosRoutes";
import {TokenManager} from "./auth/oauth2";

const app: Express = express();


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
    const kosApiHandler = await KosApi.createInstanceAsync();
    console.log(kosApiHandler.getTeachers());
})();

export default app;
