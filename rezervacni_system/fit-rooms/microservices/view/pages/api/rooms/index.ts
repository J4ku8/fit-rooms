import { NextApiRequest, NextApiResponse } from 'next'
import { sampleRoomsData } from '../../../utils/sample-data'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleRoomsData)) {
      throw new Error('Cannot find user data')
    }

    res.status(200).json(sampleRoomsData)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
