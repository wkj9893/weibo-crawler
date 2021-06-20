import type { NextApiRequest, NextApiResponse } from 'next'

export default async function url(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }
    const url = req.body.url
    if (!isValidHttpUrl(url)) {
        return res.status(400).send('Please provide a valid url')
    }
    const html = await (
        await fetch(url, {
            headers: {
                Cookie: process.env.cookie as string,
            },
        })
    ).text()
    res.status(200).send(html)
}

function isValidHttpUrl(s: string) {
    let url
    try {
        url = new URL(s)
    } catch (_) {
        return false
    }
    return url.protocol === 'http:' || url.protocol === 'https:'
}
