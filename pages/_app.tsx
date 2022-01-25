import type { AppProps } from 'next/app'
import '../styles/index.css'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import Header from 'components/Header'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())

  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <Head>
          <title>Intranet - igloolab</title>
        </Head>
        <Header />
        <div className="container mx-auto px-4 mt-12">
          <Component {...pageProps} />
        </div>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
