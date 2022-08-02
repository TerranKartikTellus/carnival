import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
       <Link href="/tools/live-location"><a>Live Location</a></Link>
      </main>

      
    </div>
  )
}

export default Home
