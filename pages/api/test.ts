import type { NextApiRequest, NextApiResponse } from 'next'
import { Weibo } from '../../utils/types'

export default async function test(req: NextApiRequest, res: NextApiResponse) {
    const weibos: Weibo[] = []
    weibos.push({
        url: 'https://weibo.com/5909342713/KkTpn2cFw',
        user: {
            id: 5909342713,
            username: '圈内教父',
        },
        created_at: '2021-6-19 21:38',
        content:
            '吴宣仪三观真的好正！资助弟弟创业，但要求一年内归还，在帮助弟弟创业的同时会传达正确的价值观和人生观！告诉他自己选择的路要自己拼搏，到了社会上没有血缘关系，成功是需要付出和努力的过程！这样价值观值得学习',
        likes_count: 1822,
        comments_count: 1612,
        reposts_count: 27000,
    })

    res.json({
        weibos,
    })
}
