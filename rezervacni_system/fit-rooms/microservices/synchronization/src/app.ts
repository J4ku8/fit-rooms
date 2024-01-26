import express, {Express} from 'express';
import helmet from 'helmet';
import bodyParser from "body-parser";
import initCrons from "./midleware/cron";
import {KosApiClient} from "./controller/cvut-kos/KosClient";
import connect from "./db";
import mongoose from "mongoose";
import {TokenManager} from "./midleware/auth/TokenManager";
import MicrosoftClient from "./controller/ms-teams/MicrosoftClient";

const app: Express = express();


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const microsoft_client = new MicrosoftClient()
const koc_client = new KosApiClient();
(async () => {
    // const rooms = await microsoft_client.roomEvents()
    // console.log(rooms)
    const db = await connect()
    const semester = await koc_client.getSemester()
    initCrons(semester?.to!)
    // const courseEvents = await koc_client.getCourseEvent(semester?.name);
    // const rooms = await koc_client.getAvailableRooms()
    // const parallels = await koc_client.getParallels(semester?.name);
})();

export default app;
