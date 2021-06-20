import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'
import { getHtml } from '../utils/index'
import { Weibo } from '../utils/types'
import kmp from '../utils/kmp'
import ac from '../utils/ac'

export default function Search() {
    const [word, setWord] = useState('')
    const [words, setWords] = useState<string[]>([])
    const [search, setSearch] = useState('')
    const [html, setHtml] = useState('')
    const [weibos, setWeibos] = useState<Weibo[]>([])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setHtml(
            await getHtml(
                'https://s.weibo.com/weibo?q=' + encodeURIComponent(search)
            )
        )
    }
    useEffect(() => {
        async function saveWeibo(urls: string[]) {
            const res = await fetch('/api/weibo', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ urls }),
            })
            const weibos = (await res.json()).weibos
            console.log(weibos)
            match(weibos)
        }

        function match(weibos: Weibo[]) {
            console.log(words)
            if (words.length === 0) {
                setWeibos(weibos)
                return
            }
            setWeibos([])
            if (words.length === 1) {
                for (const weibo of weibos) {
                    const result = kmp(weibo.content, words[0])
                    if (result.length > 0) {
                        setWeibos(prev => [...prev, weibo])
                    }
                }
                return
            }
            for (const weibo of weibos) {
                const match = ac(words)
                const result = match(weibo.content)
                if (result.length > 0) {
                    setWeibos(prev => [...prev, weibo])
                }
            }
        }

        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const array = doc.querySelectorAll('p.from > a:nth-child(1)')
        if (array.length <= 0) {
            return
        }
        const urls = []
        for (let i = 0; i < array.length; i++) {
            urls.push((array[i] as HTMLAnchorElement).href)
        }
        saveWeibo(urls)
    }, [html])

    return (
        <>
            <Head>
                <title>微博搜索</title>
            </Head>
            <main className="flex flex-col items-center gap-8">
                <img
                    className="mx-auto mt-12"
                    src="https://img.t.sinajs.cn/t4/appstyle/searchpc/css/pc/img/index_logo.png"
                    alt="weibo search"
                    width={200}
                />
                <form
                    onSubmit={handleSubmit}
                    className="flex justify-center border border-gray-300 rounded-3xl p-2 my-8 hover:shadow-md h-12"
                >
                    <span className="material-icons text-[#9aa0a6] mx-2 mt-1">
                        search
                    </span>
                    <input
                        className="focus:outline-none"
                        size={58}
                        type="text"
                        id="weibo-search"
                        value={search}
                        onChange={event => {
                            setSearch(event.target.value)
                        }}
                    />
                </form>

                <form
                    className="flex my-8"
                    onSubmit={e => {
                        e.preventDefault()
                        setWords(prev => {
                            if (prev.includes(word)) {
                                return prev
                            }
                            return [...prev, word]
                        })
                    }}
                >
                    <input
                        className="focus:ring-1 focus:ring-blue-600 focus:outline-none text-sm placeholder-gray-500 border border-gray-300 rounded-md pl-4"
                        type="text"
                        placeholder="添加关键词"
                        size={40}
                        value={word}
                        onChange={event => {
                            setWord(event.target.value)
                        }}
                    />
                    <button
                        type="submit"
                        className="ml-10 h-10 w-10 rounded-[50%] bg-[rgba(158,158,158,.2)] shadow focus:outline-none transition-transform"
                    >
                        <span className="material-icons mt-2">add</span>
                    </button>
                </form>
                <div>
                    {words.map((word, index) => (
                        <div key={word} className="flex gap-6 items-center">
                            <p>{index + 1}</p>
                            <p>{word}</p>
                            <button
                                className="flex p-2 hover:bg-gray-100 hover:rounded-[50%] focus:outline-none"
                                onClick={() => {
                                    setWords(
                                        words.filter(value => value !== word)
                                    )
                                }}
                            >
                                <span className="material-icons">remove</span>
                            </button>
                        </div>
                    ))}
                </div>
                <Weibos weibos={weibos} />

            </main>
        </>
    )
}

interface WeibosProps {
    weibos: Weibo[]
}

function Weibos({ weibos }: WeibosProps) {
    return (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase ">微博URL</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase ">发送微博用户</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase ">微博创建时间</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase ">具体内容</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase ">赞数</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase ">评论数</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase ">转发数</th>
                    </tr>
                </thead>
                <tbody>
                    {weibos.map(weibo => (
                        <tr key={weibo.url}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <a
                                    href={weibo.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {weibo.url}
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {weibo.user.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{weibo.created_at}</td>
                            <td className="px-6 py-4 whitespace-nowrap"><textarea rows={Math.ceil(weibo.content.length / 20)} cols={50} value={weibo.content} readOnly /></td>
                            <td className="px-6 py-4 whitespace-nowrap">{weibo.likes_count}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{weibo.comments_count}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{weibo.reposts_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}
