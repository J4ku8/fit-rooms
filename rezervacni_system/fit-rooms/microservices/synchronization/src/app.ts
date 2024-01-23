import express, {Express} from 'express';
import helmet from 'helmet';
import bodyParser from "body-parser";
import initCrons from "./midleware/cron";
import {KosApi} from "./controller/cvut-kos/KosApiRoutes";
import connect from "./db";
import mongoose from "mongoose";

const app: Express = express();


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const kosApiHandler = new KosApi();
(async () => {
    const db = await connect()
    const semester = await kosApiHandler.getSemester()
    initCrons(semester?.to!)
    const courseEvents = await kosApiHandler.getCourseEvent(semester?.name);
    const rooms = await kosApiHandler.getAvailableRooms()
    // const teachers = await kosApiHandler.getTeachers();
    // const parallels = await kosApiHandler.getParallels(semester);

})();

export default app;
