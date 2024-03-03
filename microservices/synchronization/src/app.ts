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
import microsoftClient from "./controller/ms-teams/MicrosoftClient";

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
    const allRooms = await kos_client.getAvailableRooms()
    const promises = allRooms?.map((room) => microsoft_client.roomEvents(room.emailAddress))
    const roomEvents = promises ? await Promise.all(promises) : []
    const allEvents = [...microsoftParrallels?.flat(), ...microsoftExams, ...microsoftCourseEvents]
    const conflicts: Conflict = []
    const toBeDeleted: Event[] = roomEvents.flat()

    // TODO: new tests
    const newEvents = allEvents.flat().filter((event: Event) => {
        const roomEventStartDate = new Date(event?.start?.dateTime)
        const roomEventEndDate = new Date(event?.end?.dateTime)
        const location = event.location.displayName
        const eventName = event.subject;
        const filteredEvents = roomEvents.filter(async (eventOfRoom: Event) => {
            const isSameRoom = eventOfRoom?.locations?.some(loc => loc.displayName === location)
            const isSameEvent = eventOfRoom.subject === eventName;
            if (isSameRoom && isSameEvent) {
                const eventStartDate = new Date(eventOfRoom?.start?.dateTime)
                const eventEndDate = new Date(eventOfRoom?.end?.dateTime)
                const isOverlap = eventEndDate > roomEventStartDate || roomEventEndDate > eventStartDate
                if (eventStartDate === roomEventStartDate) {
                    if (isOverlap) {
                        toBeDeleted.push(eventOfRoom);
                        return event
                    }
                    return null
                }
                if (eventStartDate !== eventStartDate) {
                    toBeDeleted.push(eventOfRoom);
                    return event
                }
                if (isSameRoom && !isSameEvent && (eventStartDate === roomEventStartDate || isOverlap)) {
                    const roomName = eventOfRoom?.locations?.find(loc => loc.displayName === location) || ""
                    const room = await Room.findOne({displayName: roomName});
                    room && conflicts.push({
                        current: eventOfRoom,
                        newEvent: event,
                        roomId: room?.roomId
                    })
                    return
                }
            }
        })
        return filteredEvents
    })
    //
    // try {
    //     const deletationsToSend = toBeDeleted?.map((event: Event) => {
    //         microsoft_client.deleteEvent({roomEmail: event.attendees[0].emailAddress.address, eventId: event.id})
    //     })
    //     const eventsToSend = newEvents?.forEach((event: Event) => {
    //          microsoft_client.createEvent({roomEmail: event.attendees[0].emailAddress.address, event: event})
    //     })
    //     const conflictToSend = conflicts.map((conflict: any) =>{
    //        microsoft_client.sendEmail({roomId : conflict.roomId, recipients: "tichyj15@x2h3h.onmicrosoft.com", content: `There is a conflict between existing event ${conflict.current.subject} at ${conflict.current.start.dateTime} and new incoming from KOS ${conflict.newEvent.subject} at ${conflict.newEvent.start.dateTime}`})
    //     })
    //     await Promise.all([eventsToSend])
    // }catch (e) {
    //     console.log(e)
    // }


    // to email -> API


    // await initCrons(kos_client, microsoft_client)
})();

export default app;
