import cron from 'node-cron';
import { currentTime } from '../../utils/time-handler';
import Room from '../../db/model/room';
import {
  syncEvents,
} from '../synchronization';
import MicrosoftClient from '../../controller/ms-teams/MicrosoftClient';
import { KosApiClient } from '../../controller/cvut-kos/KosClient';

const kosSync = (
  graphClient: MicrosoftClient,
  kosClient: KosApiClient,
) =>
  cron.schedule(
    '*/10 * * * *',
    async () => {
      await syncEvents(kosClient, graphClient);
    },
    {
      scheduled: true,
      timezone: 'Europe/Prague',
    }
  );

const semesterTask = (kos_client: KosApiClient) =>
  cron.schedule(
    '0 3 * * *',
    async () => {
      await kos_client.getSemester();
    },
    {
      scheduled: true,
      timezone: 'Europe/Prague',
    }
  );

export const writeRooms = async (client: MicrosoftClient) => {
    const microsoftRooms = await client.listRooms();
    const bulkOps = microsoftRooms.map((room: { roomId: string }) => ({
        updateOne: {
            filter: { roomId: room.roomId },
            update: { $set: room },
            upsert: true,
        },
    }));
    Room.bulkWrite(bulkOps)
        .then((result: any) => console.log(result))
        .catch((error: any) =>
            console.error('Error at writing record to DB:', error)
        );
    console.log("Rooms updated at: ", currentTime());
}

const roomSync = (client: MicrosoftClient) =>
  cron.schedule(
    '*/5 * * * *',
    async () => {
        await writeRooms(client)
    },
    {
      scheduled: true,
      timezone: 'Europe/Prague',
    }
  );

const initCrons = async (
  kos_client: KosApiClient,
  graphClient: MicrosoftClient
) => {
  kosSync(graphClient, kos_client).start();
  semesterTask(kos_client).start();
  roomSync(graphClient).start();
};

export default initCrons;
