import puppeteer from 'puppeteer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { User, Weibo } from '../../utils/types'
import WeiboModel from '../../models/Weibo'
import dbConnect from '../../utils/dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect()
    const { urls } = req.body
    if (!urls) {
        res.status(400).json({ message: 'please provide urls' })
    }

    const weibos = []

    // const browser = await puppeteer.launch()
    const browser = await puppeteer.launch({ headless: false })
    for (const url of urls) {
        const page = await browser.newPage()
        await page.setCookie({
            name: (process.env.cookie as string).split("=")[0],
            value: (process.env.cookie as string).split("=")[1],
            domain: '.weibo.com',
        })
        await page.goto(url)

        const weibo: Weibo = await page.evaluate(async () => {
            const id = (
                document.querySelector('a.W_f14') as HTMLAnchorElement
            ).href
                .split('/')
                .pop() as string
            const username = (
                document.querySelector('a.W_f14') as HTMLAnchorElement
            ).innerText

            const user: User = { id: parseInt(id), username }

            const created_at = (
                document.querySelector('.WB_from a.S_txt2') as HTMLAnchorElement
            ).title
            const content = (
                document.querySelector('.WB_text.W_f14') as HTMLDivElement
            ).innerText
            const likes_count = (
                document.querySelectorAll('span.pos em')[7] as HTMLEmbedElement
            ).innerText
            const comments_count = (
                document.querySelectorAll('span.pos em')[5] as HTMLEmbedElement
            ).innerText
            const reposts_count = (
                document.querySelectorAll('span.pos em')[3] as HTMLEmbedElement
            ).innerText
            return {
                user,
                created_at,
                content,
                likes_count: /^\d+$/.test(likes_count)
                    ? parseInt(likes_count)
                    : 0,
                comments_count: /^\d+$/.test(comments_count)
                    ? parseInt(comments_count)
                    : 0,
                reposts_count: /^\d+$/.test(reposts_count)
                    ? parseInt(reposts_count)
                    : 0,
            }
        })
        weibos.push(weibo)
        // await page.close()
    }

    res.json({ weibos })
    await browser.close()
    for (const weibo of weibos) {
        const {
            user,
            created_at,
            content,
            likes_count,
            comments_count,
            reposts_count,
        } = weibo
        const weiboModel = new WeiboModel({
            user,
            created_at,
            content,
            likes_count,
            comments_count,
            reposts_count,
        })
        // console.log(weiboModel)
        await weiboModel.save()
    }
}
