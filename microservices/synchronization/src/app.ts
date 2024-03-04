import express, {Express} from 'express';
import helmet from 'helmet';
import bodyParser from "body-parser";

import connect from "./db";
import {getEvents, parseCourseEvents, parseExams, parseParrallels} from "./midleware/synchronization";
import {WEEKS_OF_LECTURES} from "./utils/constants";
import {KosApiClient} from "./controller/cvut-kos/KosClient";
import initCrons from './midleware/cron';
import MicrosoftClient from './controller/ms-teams/MicrosoftClient';
import {Conflict, Event as EventType} from "./utils/types";
import Room from "./db/model/room";
import microsoftClient from "./controller/ms-teams/MicrosoftClient";
import moment from "moment";

const app: Express = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const microsoft_client = new MicrosoftClient();
const kos_client = new KosApiClient();
(async () => {
    await connect();
    const semester = await kos_client.getSemester();

    const courseEvents = await kos_client.getCourseEvent(semester.name);
    const exams = await kos_client.getExams(semester.name)
    const parallels = await kos_client.getParallels(semester?.name);

    const endOfLectures = new Date(new Date(semester.from).setDate(semester.from.getDate() + (WEEKS_OF_LECTURES * 7) + 5));
    const microsoftParrallels = await parseParrallels({
        semesterStart: semester.from,
        semesterEnd: endOfLectures,
        data: parallels
    });
    const microsoftExams = await parseExams(exams);
    const microsoftCourseEvents = await parseCourseEvents(courseEvents);
    const allEvents = [...microsoftParrallels?.flat(), ...microsoftExams, ...microsoftCourseEvents]

    const pokus: EventType[] = [{
        subject: 'Test event',
        body: { contentType: 'HTML', content: 'Test event' },
        start: {
            dateTime: '2024-02-19T11:00:00.000Z',
            timeZone: 'Central Europe Standard Time'
        },
        end: {
            dateTime: '2024-02-19T12:00:00.000Z',
            timeZone: 'Central Europe Standard Time'
        },
        location: { displayName: 'test_room' },
        recurrence: {
            pattern: {
                type: 'weekly',
                interval: 1,
                daysOfWeek: ["Monday"],
                firstDayOfWeek: 'Monday'
            },
            range: { type: 'endDate', startDate: '2024-02-19', endDate: '2024-05-25' }
        },
        attendees: [
            {
                emailAddress: { address: 'Test_room@x2h3h.onmicrosoft.com', name: 'test_room' },
                type: 'required'
            }
        ]
    }
    ]

   const { conflictedEvents, newEvents } = await getEvents(pokus, microsoft_client)
    console.log(conflictedEvents.length, newEvents.length)
    // to email -> API


    // await initCrons(kos_client, microsoft_client)
})();

export default app;
