import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'

export default async function control(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { url } = req.body
    console.log(url)

    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.setCookie({
        name: (process.env.control_cookie as string).split('=')[0],
        value: (process.env.control_cookie as string).split('=')[1],
        domain: 'weibo.com',
    })
    await page.goto(url)
    await (await page.waitForSelector('#app > div.woo-box-flex.woo-box-column.Frame_wrap_3g67Q > div.woo-box-flex.Frame_content_3XrxZ.Frame_noside1_3M1rh.Frame_noside2_1lBwY > div.Frame_main_3Z_V0 > main > div > div > div.woo-panel-main.woo-panel-top.woo-panel-right.woo-panel-bottom.woo-panel-left.Card_wrap_2ibWe.Card_bottomGap_2Xjqi.Detail_detail_3typT > article > div.title_wrap_3e__u > div > div.woo-box-flex > div > div > span > div > i'))?.click()
    await (await page.waitForSelector('#app > div.woo-box-flex.woo-box-column.Frame_wrap_3g67Q > div.woo-box-flex.Frame_content_3XrxZ.Frame_noside1_3M1rh.Frame_noside2_1lBwY > div.Frame_main_3Z_V0 > main > div > div > div.woo-panel-main.woo-panel-top.woo-panel-right.woo-panel-bottom.woo-panel-left.Card_wrap_2ibWe.Card_bottomGap_2Xjqi.Detail_detail_3typT > article > div.title_wrap_3e__u > div > div.woo-box-flex > div > div > div > div > div:nth-child(7)'))?.click()

}
