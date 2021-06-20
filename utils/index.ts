export async function getHtml(url: string) {
    const res = await (
        await fetch('/api/url', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        })
    ).text()
    return res
}

export function getDate() {
    const date = new Date()
    return `${date.getFullYear().toString().padStart(4, '0')}-${(
        date.getMonth() + 1
    )
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
}
