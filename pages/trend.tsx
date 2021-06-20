import { useState, useEffect } from 'react'
import { getHtml, getDate } from '../utils/index'
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

export default function TrendPage() {
    const [html, setHtml] = useState('')
    const [trends, setTrends] = useState<Trend[]>([])

    async function handleClick() {
        setHtml(
            await getHtml('https://s.weibo.com/top/summary?cate=realtimehot')
        )
    }

    useEffect(() => {
        const trends: Trend[] = []
        const date = getDate()

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
        setTrends(trends)
        saveTrend({ date, trends })
    }, [html])

    return (
        <main className="flex flex-col items-center mt-16 mb-12 gap-12">
            <button
                className="border border-gray-300 hover:bg-gray-100 text-sm rounded-md px-4 py-2 focus:outline-none"
                onClick={handleClick}
            >
                热搜榜
            </button>
            <TrendsTable trends={trends} />
        </main>
    )
}


interface TrendsProps {
    trends: Trend[]
}

function TrendsTable({ trends }: TrendsProps) {
    return (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase ">序号</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase ">关键词</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase ">热搜次数</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {trends.map(trend => (
                        <tr key={trend.rank}>
                            <td className="px-6 py-4 whitespace-nowrap">{trend.rank}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <a
                                    href={trend.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {trend.keyword}
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {trend.times}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}