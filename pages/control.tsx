import { FormEvent, useState } from 'react'

export default function Control() {
    const [url, setUrl] = useState('')
    const [content, setContent] = useState('')

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        console.log(url)
        await fetch('/api/control', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        })
    }

    return (
        <main className="flex flex-col items-center gap-8">
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
                    placeholder="请输入管控的URL"
                    value={url}
                    onChange={event => {
                        setUrl(event.target.value)
                    }}
                />
            </form>
        </main>
    )
}
