import express, {Express} from 'express';
import helmet from 'helmet';
import bodyParser from "body-parser";
import initCrons from "./midleware/cron";
import {KosApiClient} from "./controller/cvut-kos/KosClient";
import connect from "./db";
import {TokenManager} from "./midleware/auth/TokenManager";
import MicrosoftClient from "./controller/ms-teams/MicrosoftClient";

import {parseParrallels} from "./midleware/synchronization";
import {WEEKS_OF_LECTURES} from "./utils/constants";
import microsoftClient from "./controller/ms-teams/MicrosoftClient";
const app: Express = express();


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const microsoft_client = new MicrosoftClient()
const kos_client = new KosApiClient();
(async () => {
    const db = await connect()
    const semester = await kos_client.getSemester()
    // const courseEvents = await kos_client.getCourseEvent("B231");
    // const exams = await kos_client.getExams(semester.name)
    // const parallels = await kos_client.getParallels(semester?.name);
    // const endOfLectures = new Date(new Date(semester.from).setDate(semester.from.getDate() + (WEEKS_OF_LECTURES * 7) + 5 ))
    // const events = await parseParrallels({ semesterStart: semester.from, semesterEnd: endOfLectures, data: parallels})

    // await microsoft_client.createEvent({ roomEmail: events[0].attendees[0].emailAddress.address, event: events[0]})
    // const roomEvents = await microsoft_client.roomEvents(events[0].attendees[0].emailAddress.address)
    // // @ts-ignore
    // roomEvents?.map(item => {
    //     microsoft_client.deleteEvent({ roomEmail: events[0].attendees[0].emailAddress.address, eventId: item.id})
    // })

    // initCrons(semester?.to!, semester?.from!, microsoft_client)
})();

export default app;
