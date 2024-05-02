import express, { Express } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import connect from './db';
import { KosApiClient } from './controller/cvut-kos/KosClient';
import initCrons, { writeRooms } from './midleware/crons';
import MicrosoftClient from './controller/ms-teams/MicrosoftClient';
import { syncEvents } from './midleware/synchronization';

const app: Express = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const microsoft_client = new MicrosoftClient();
const kos_client = new KosApiClient();
(async () => {
  await connect();
  // await writeRooms(microsoft_client);
  // await syncEvents(kos_client, microsoft_client);
  // await initCrons(kos_client, microsoft_client);
})();

export default app;
