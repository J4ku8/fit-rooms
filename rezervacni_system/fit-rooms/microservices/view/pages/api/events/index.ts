import { NextApiRequest, NextApiResponse } from 'next'
import {sampleEventsData} from "../../../src/utils/sample-data";
import {isToday} from "../../../src/utils/time-helper";
import GraphApiClient from "../../../model/GraphApiClient";
import {AppSettings} from "../../../src/types";
import {NextError} from "next/dist/lib/is-error";

const settings: AppSettings = {
    clientSecret:  process.env.CLIENT_SECRET_MS || "",
    clientId:  process.env.CLIENT_ID_MS || "",
    tenantId: process.env.TENANT_ID_MS || "",
    graphUserScopes: ["user.read"]
}


const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log(_req)
        const roomEmail = _req.query.roomEmail
        const microsoftAuth = new GraphApiClient(settings)
        const client = microsoftAuth.initializeGraphForAppOnlyAuth()
        const events = await client?.api(`/users/${roomEmail}/calendar/events`)
            .get();
        // const result = events.filter(event => {
        //     const fromDate = event.from;
        //     const dateObject = new Date(fromDate);
        //     const isTodayEvent = isToday(dateObject)
        //     return event.room === roomName && isTodayEvent;
        // })
        console.log(events)
        res.status(200).json(events)

    } catch (err: any) {
        console.log(`Error getting users: ${err}`);
        res.status(500).json({ statusCode: 500, message: err.message })
    }



}

export default handler
