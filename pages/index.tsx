import Head from 'next/head'
import { Heading } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Presalano: Home</title>
        <meta name="description" content="Native token launchpad for cardano" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>Presalano</Heading>
      </main>
    </>
  )
}
