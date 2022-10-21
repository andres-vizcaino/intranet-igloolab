import type { AppProps } from 'next/app'
import '../styles/index.css'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'next-themes'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import HomeLayout from 'components/HomeLayout'
import AuthGuard from 'components/AuthGuard'
import { NextPage } from 'next'

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
}

function MyApp(props: AppProps) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())

  const {
    Component,
    pageProps: { session, ...pageProps },
  }: { Component: NextApplicationPage; pageProps: any } = props

  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <Head>
          <title>Intranet - igloolab</title>
        </Head>
        <ThemeProvider attribute="class">
          {Component.requireAuth ? (
            <AuthGuard>
              <HomeLayout>
                <Component {...pageProps} />
              </HomeLayout>
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
