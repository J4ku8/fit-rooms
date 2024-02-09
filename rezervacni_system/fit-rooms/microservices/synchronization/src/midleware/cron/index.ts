import cron from 'node-cron';
import {currentTime, isoToCron} from "../../utils/time-handler";
import {Client} from "@microsoft/microsoft-graph-client";
import GraphTutorial from "../../controller/ms-teams/MicrosoftClient";
import Room from "../../db/model/room";

// parallels, courseEvents
const kosSync = cron.schedule('*/30 * * * *', () => {
    console.log(currentTime(), 'Tato funkce se spustí každou půl hodinu');
});

// semester, then to DB -> schedule cron to start/end of semester
const semesterTask = (semesterTime: string) => cron.schedule(semesterTime, () => {
    console.log('Tato funkce se spustí začátkem semestru');
});

const roomSync = (client: GraphTutorial) => cron.schedule('*/5 * * * *', async () => {
   const microsoftRooms = await client.listRooms()
    const bulkOps = microsoftRooms.map((room: { roomId: string; }) => ({
        updateOne: {
            filter: { roomId: room.roomId },
            update: { $set: room },
            upsert: true
        }
    }));

    Room.bulkWrite(bulkOps)
        .then(result => console.log(result))
        .catch(error => console.error('Error at writing record to DB:', error));
})

const initCrons = (semesterTriggerTime: Date, graphClient: GraphTutorial) => {
    const cronDate = isoToCron(semesterTriggerTime)
    kosSync.start();
    semesterTask(cronDate).start();
    roomSync(graphClient).start
}

export default initCrons
