import { NextApiRequest, NextApiResponse } from 'next'
import {isToday} from "../../../src/utils/time-helper";
import GraphApiClient from "../../../model/GraphApiClient";
import {AppSettings, PatternTypes} from "../../../src/types";

const settings: AppSettings = {
    clientSecret:  process.env.CLIENT_SECRET_MS || "",
    clientId:  process.env.CLIENT_ID_MS || "",
    tenantId: process.env.TENANT_ID_MS || "",
    graphUserScopes: ["user.read"]
}

const REQURENCE_PATTERN_TYPES: PatternTypes = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: "absoluteMonthly"
};

const REQURENCE_PATTERN_TYPES_ARRAY = Object.keys(REQURENCE_PATTERN_TYPES).map(key => REQURENCE_PATTERN_TYPES[key])

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        const roomEmail = _req.query.roomEmail
        const microsoftAuth = new GraphApiClient(settings)
        const client = microsoftAuth.initializeGraphForAppOnlyAuth()
        const events = await client?.api(`/users/${roomEmail}/calendar/events`)
            .get();
        // @ts-ignore
        const filteredEvents = events.value?.filter(event => {
            if(isToday(new Date(event?.start?.dateTime)) || REQURENCE_PATTERN_TYPES_ARRAY.includes(event.recurrence?.pattern?.type)){
                // TODO: verify that today is day in week/month/year, which it is schedulled
                return event
            }
        })
        console.log(filteredEvents?.length)
        res.status(200).json(events.value)

    } catch (err: any) {
        console.log(`Error getting users: ${err}`);
        res.status(500).json({ statusCode: 500, message: err.message })
    }



}

export default handler
