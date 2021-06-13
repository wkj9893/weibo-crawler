import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/dbConnect'
import Trend from '../../models/Trend'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect()
    const { date, trends } = req.body
    const trend = new Trend({
        date,
        trends,
    })
    await trend.save()
    res.status(200).end()
}
