import cron from 'node-cron';
import { currentTime, isoToCron } from "../../utils/time-handler";
import Room from "../../db/model/room";
import {parseParrallels, parseExams, parseCourseEvents} from "../synchronization";
import MicrosoftClient from "../../controller/ms-teams/MicrosoftClient";
import {KosApiClient} from "../../controller/cvut-kos/KosClient";
import {WEEKS_OF_LECTURES} from "../../utils/constants";

const kosSync = (graphClient: MicrosoftClient, kosClient: KosApiClient, semester: any) => cron.schedule('*/30 * * * *', async () => {
    const courseEvents = await kosClient.getCourseEvent(semester.name);
    const exams = await kosClient.getExams(semester.name)
    const parallels = await kosClient.getParallels(semester?.name);
    const endOfLectures = new Date(new Date(semester.from).setDate(semester.from.getDate() + (WEEKS_OF_LECTURES * 7) + 5 ))
    const microsoftParralels = await parseParrallels({ semesterStart: semester.from, semesterEnd: endOfLectures, data: parallels})
    const microsoftExams = await parseExams(exams)
    const microsoftCourseEvents = await parseCourseEvents(courseEvents)
    const allEvents = [...microsoftParralels, ...microsoftExams, ...microsoftCourseEvents]
    allEvents.forEach(async (event) => {
        await graphClient.createEvent({ roomEmail: event.attendees[0].emailAddress.address, event: event})
    })
    console.log(currentTime(), 'Tato funkce se spustí každou půl hodinu');
}, {
    scheduled: true,
    timezone: "Europe/Prague"
});


const semesterTask = (kos_client: KosApiClient) => cron.schedule('0 3 * * *', async () => {
    return await kos_client.getSemester()
}, {
    scheduled: true,
    timezone: "Europe/Prague"
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
}, {
    scheduled: true,
    timezone: "Europe/Prague"
})

const initCrons = async (kos_client: KosApiClient, graphClient: MicrosoftClient) => {
    let semester = await kos_client.getSemester()
    kosSync(graphClient, kos_client, semester).start();
    semesterTask(kos_client).start();
    roomSync(graphClient).start();


}

export default initCrons
