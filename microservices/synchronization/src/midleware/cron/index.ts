import cron from 'node-cron';
import {currentTime, isoToCron} from "../../utils/time-handler";
import Room from "../../db/model/room";
import {parseParrallels, parseExams, parseCourseEvents} from "../synchronization";
import MicrosoftClient from "../../controller/ms-teams/MicrosoftClient";

// parallels, courseEvents
const kosSync = (graphClient: MicrosoftClient, semesterStart: Date, semesterEnd: Date, parallels: any, courseEvents: any, exams: any) => cron.schedule('*/30 * * * *', async () => {
    const msParallels = await parseParrallels( {semesterStart, semesterEnd, data: parallels})
    const msExams = await parseExams(exams)
    const msCourseEvents = await parseCourseEvents(courseEvents)
    const allEvents = [...msParallels, ...msExams, ...msCourseEvents]
    allEvents.forEach(async (event) => {
        await graphClient.createEvent({ roomEmail: event.attendees[0].emailAddress.address, event: event})
    })
    console.log(currentTime(), 'Tato funkce se spustí každou půl hodinu');
});

// semester, then to DB -> schedule cron to start/end of semester
const semesterTask = (semesterTime: string) => cron.schedule(semesterTime, () => {
    // TODO: add semester fetch
    console.log('Tato funkce se spustí začátkem semestru');
});

const roomSync = (client: MicrosoftClient) => cron.schedule('*/5 * * * *', async () => {
   const microsoftRooms = await client.listRooms()
    const bulkOps = microsoftRooms.map((room: { roomId: string; }) => ({
        updateOne: {
            filter: { roomId: room.roomId },
            update: { $set: room },
            upsert: true
        }
    }));

    Room.bulkWrite(bulkOps)
        .then((result: any) => console.log(result))
        .catch((error: any) => console.error('Error at writing record to DB:', error));
})

const initCrons = (semesterEnd: Date, semesterStart: Date, graphClient: MicrosoftClient, parallels: any, exams: any, courseEvents: any) => {
    const cronDate = isoToCron(semesterEnd)
    kosSync(graphClient, semesterStart, semesterEnd, parallels, courseEvents, exams).start();
    semesterTask(cronDate).start();
    roomSync(graphClient).start
}

export default initCrons
