import { NextApiRequest, NextApiResponse } from 'next'
import { sampleEventsData } from '../../../utils/sample-data'
import {isToday} from "../../../utils/time-helper";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
    try {

        if (!Array.isArray(sampleEventsData)) {
            throw new Error('Cannot find user data')
        }
        const roomName = _req.body.room
        const result = sampleEventsData.filter(event => {
            const fromDate = event.from;
            const dateObject = new Date(fromDate);
            const isTodayEvent = isToday(dateObject)
            return event.room === roomName && isTodayEvent;
        })

        res.status(200).json(result)
    } catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

export default handler
