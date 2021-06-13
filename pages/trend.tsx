import { useState, useEffect } from 'react'
import { getHtml } from '../utils/index'
import { TrendList, Trend } from '../utils/types'

async function saveTrend(trendList: TrendList) {
    await fetch('/api/trend', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(trendList),
    })
}

export default function wkj() {
    const [html, setHtml] = useState('')
    async function handleClick() {
        setHtml(
            await getHtml('https://s.weibo.com/top/summary?cate=realtimehot')
        )
    }

    useEffect(() => {
        const trends: Trend[] = []
        const date = new Date().toLocaleString()

        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const list = doc.querySelectorAll('tr')
        const baseURL = 'https://s.weibo.com/weibo'

        list.forEach(node => {
            const array = node.querySelectorAll('td')
            if (array.length === 3) {
                //  热搜排名
                const rank = array[0].textContent
                //  热搜关键词
                const keyword = array[1].querySelector('a')?.textContent
                //  热搜次数
                const times = array[1].querySelector('span')?.textContent
                //  热搜网址
                const trendURl = baseURL + array[1].querySelector('a')?.search
                if (rank && keyword && times && /^\d+$/.test(rank)) {
                    trends.push({
                        rank: parseInt(rank),
                        keyword,
                        times: parseInt(times),
                        url: trendURl,
                    })
                }
            }
        })
        saveTrend({ date, trends })
    }, [html])

    return (
        <>
            <h1>hello world</h1>
            <button onClick={handleClick}>test my app</button>
            <textarea
                rows={15}
                cols={100}
                value={html}
                onChange={e => {
                    setHtml(e.target.value)
                }}
            />
        </>
    )
}
