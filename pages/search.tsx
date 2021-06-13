import { FormEvent, useEffect, useState } from 'react'
import { getHtml } from '../utils/index'
import { Weibo } from '../utils/types'

async function parseWeibo(url: string) {
    const html = await getHtml(url)
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    console.log(doc.querySelectorAll('div'))
}

async function test() {
    const parser = new DOMParser()
    const html = await getHtml('https://weibo.com/6336553950/KjxIE1mXz')

    const doc = parser.parseFromString(html, 'text/html')
    document.body = doc.body

    // const iframe = document.createElement('iframe')
    // iframe.style.display = "none"
    // iframe.src = 'https://weibo.com/6336553950/KjxIE1mXz'
    // iframe.width = "400px"
    // iframe.height = "400px"
    // document.body.appendChild(iframe)

    // document.querySelector("iframe")?.remove()
}

export default function search() {
    const [search, setSearch] = useState('')
    const [html, setHtml] = useState('')

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        console.log(search)
        setHtml(
            await getHtml(
                'https://s.weibo.com/weibo?q=' + encodeURIComponent(search)
            )
        )
    }
    useEffect(() => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const list: NodeListOf<HTMLAnchorElement> =
            doc.querySelectorAll('p.from a')

        list.forEach(async node => {
            if (node.target === '_blank') {
                await parseWeibo(node.href)
            }
        })
    }, [html])

    return (
        <>
            <h1>Search Weibo</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="weibo-search">Search Weibo:</label>
                <input
                    type="text"
                    id="weibo-search"
                    onChange={event => {
                        setSearch(event.target.value)
                    }}
                />
                <button type="submit">Search</button>
            </form>
            <button onClick={test}>Test</button>
        </>
    )
}
