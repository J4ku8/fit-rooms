import { NextApiRequest, NextApiResponse } from 'next'
import { sampleRoomsData } from '../../../utils/sample-data'


// TODO: zde udělat celou logiku, fethcování dat z MS, poté filtrace a vrácení dat

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
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
