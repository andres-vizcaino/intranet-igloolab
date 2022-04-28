import type { AppProps } from 'next/app'
import '../styles/index.css'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { ThemeProvider } from 'next-themes'
import Router from 'next/router'
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css' //styles of nprogress
import MenuButtons from 'components/MenuButtons'
import HomeLayout from 'components/HomeLayout'

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())

  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <Head>
          <title>Intranet - igloolab</title>
        </Head>
        <ThemeProvider attribute="class">
          <HomeLayout>
            <Component {...pageProps} />
          </HomeLayout>
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
