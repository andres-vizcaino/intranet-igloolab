import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <div>
      <Image src="/vercel.svg" alt="logo" width={200} height={200} />
      <p className="text-red-700 text-2xl">Hello Next.js</p>
    </div>
  </>
)

export default Home
