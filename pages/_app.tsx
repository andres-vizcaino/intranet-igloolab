import type { AppProps } from 'next/app'
import '../styles/index.css'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'next-themes'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import AuthGuard from 'components/AuthGuard'
import { NextPage } from 'next'
import Head from 'next/head'
import Layout from 'components/Layout'

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
          <title>igloolab - intranet</title>
        </Head>
        <ThemeProvider attribute="class">
          {Component.requireAuth ? (
            <AuthGuard>
              <Layout>
                <Component {...pageProps} />
              </Layout>
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
