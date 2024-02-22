import express, {Express} from 'express';
import helmet from 'helmet';
import bodyParser from "body-parser";
import initCrons from "./midleware/cron";
import {KosApiClient} from "./controller/cvut-kos/KosClient";
import connect from "./db";
import {TokenManager} from "./midleware/auth/TokenManager";
import MicrosoftClient from "./controller/ms-teams/MicrosoftClient";

import {parseCvutData} from "./midleware/synchronization";
import {WEEKS_OF_LECTURES} from "./utils/constants";
const app: Express = express();


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const microsoft_client = new MicrosoftClient()
const koc_client = new KosApiClient();
(async () => {
    const db = await connect()
    const semester = await koc_client.getSemester()
    const courseEvents = await koc_client.getCourseEvent(semester?.name);
    // const parallels = await koc_client.getParallels(semester?.name);
    // const rooms = await microsoft_client.roomEvents()
    const endOfLectures = new Date(new Date(semester.from).setDate(semester.from.getDate() + (WEEKS_OF_LECTURES * 7) + 5 ))
    const events = parseCvutData({ semesterStart: semester.from, semesterEnd: endOfLectures})
    console.log("events", events[0].recurrence)
    // initCrons(semester?.to!, semester?.from!, microsoft_client)
})();

export default app;
