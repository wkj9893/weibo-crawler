import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Weibo Crawler</title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                />
            </Head>
            <Component {...pageProps} />
        </>
    )
}
export default MyApp
