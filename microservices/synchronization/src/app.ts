import express, { Express } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import connect from './db';
import { KosApiClient } from './controller/cvut-kos/KosClient';
import initCrons from './midleware/cron';
import MicrosoftClient from './controller/ms-teams/MicrosoftClient';

const app: Express = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const microsoft_client = new MicrosoftClient();
const kos_client = new KosApiClient();
(async () => {
  await connect();

  // // TODO: test this
  // const res = await microsoft_client.sendEmail({ roomId: 'Test_room@x2h3h.onmicrosoft.com', recipient: "tichyj15@x2h3h.onmicrosoft.com", content: "Testing email" });

  await initCrons(kos_client, microsoft_client);
})();

export default app;
