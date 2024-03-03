import express, {Express} from 'express';
import helmet from 'helmet';
const fs = require('fs');
import bodyParser from "body-parser";

import connect from "./db";
import {parseCourseEvents, parseExams, parseParrallels} from "./midleware/synchronization";
import {WEEKS_OF_LECTURES} from "./utils/constants";
import {KosApiClient} from "./controller/cvut-kos/KosClient";
import initCrons from './midleware/cron';
import MicrosoftClient from './controller/ms-teams/MicrosoftClient';
import * as events from "events";
import {Conflict, Event} from "./utils/types";
import Room from "./db/model/room";

const app: Express = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const microsoft_client = new MicrosoftClient();
const kos_client = new KosApiClient();
(async () => {
    await connect();
    const semester = await kos_client.getSemester();
    const courseEvents = await kos_client.getCourseEvent(semester.name);
    const exams = await kos_client.getExams(semester.name)
    const parallels = await kos_client.getParallels(semester?.name);
    const endOfLectures = new Date(new Date(semester.from).setDate(semester.from.getDate() + (WEEKS_OF_LECTURES * 7) + 5 ));
    const microsoftParrallels = await parseParrallels({ semesterStart: semester.from, semesterEnd: endOfLectures, data: parallels});
    const microsoftExams = await parseExams(exams);
    const microsoftCourseEvents = await parseCourseEvents(courseEvents);


    await microsoft_client.createEvent({roomEmail: microsoftParrallels[0].attendees[0].emailAddress.address, event: microsoftParrallels[0]})
    const roomEvents = await microsoft_client.roomEvents("th_a_1455@x2h3h.onmicrosoft.com")
    const allEvents = [...microsoftParrallels?.flat(), ...microsoftExams, ...microsoftCourseEvents]

    const conflicts: Conflict = []
    const toBeDeleted: any[] = []

    const newEvents = roomEvents.filter((roomEvent: Event) => {
        const roomEventStartDate = new Date(roomEvent.start.dateTime)
        const roomEventEndDate = new Date(roomEvent.end.dateTime)
        const location = roomEvent.location.displayName
        const eventName = roomEvent.subject;
        const filteredEvents = allEvents.filter( async (event: Event) => {
            const isSameRoom = roomEvent?.locations?.some(loc => loc.displayName === location)
            const isSameEvent = event.subject === eventName;
            if(isSameRoom && isSameEvent){
                const eventStartDate = new Date(event.start.dateTime)
                const eventEndDate = new Date(event.end.dateTime)
                const isOverlap = eventEndDate > roomEventStartDate || roomEventEndDate > eventStartDate
                if(eventStartDate === roomEventStartDate){
                    if(isOverlap){
                        toBeDeleted.push(roomEvent);
                        return event
                    }
                    return null
                }
                if(eventStartDate !== eventStartDate){
                    toBeDeleted.push(roomEvent);
                    return event
                }
                if(isSameRoom && !isSameEvent && (eventStartDate === roomEventStartDate || isOverlap)){
                    const roomName = roomEvent?.locations?.find(loc => loc.displayName === location) || ""
                    const room = await Room.findOne({ displayName: roomName });
                    room && conflicts.push({
                        current: roomEvent,
                        newEvent: event,
                        roomId: room?.roomId
                    })
                }
            }
        })
        return filteredEvents
    })

    try {

        toBeDeleted?.forEach((event: Event) => {
            setTimeout(async () => await microsoft_client.deleteEvent({roomEmail: event.attendees[0].emailAddress.address, eventId: event.id}), 5000)
        })
        newEvents?.forEach((event: Event) => {
            setTimeout(async () => await microsoft_client.createEvent({roomEmail: event.attendees[0].emailAddress.address, event: event}), 5000)
        })
        conflicts.forEach((conflict: any) =>{
            setTimeout(async () =>   await microsoft_client.sendEmail({roomId : conflict.roomId, recipients: "tichyj15@x2h3h.onmicrosoft.com", content: `There is a conflict between existing event ${conflict.current.subject} at ${conflict.current.start.dateTime} and new incoming from KOS ${conflict.newEvent.subject} at ${conflict.newEvent.start.dateTime}`}), 5000)

        })
    }catch (e) {
        console.log(e)
    }


    // to email -> API




    // await initCrons(kos_client, microsoft_client)
})();

export default app;
