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
