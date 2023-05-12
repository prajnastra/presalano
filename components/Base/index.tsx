import Head from 'next/head'
import { ReactNode } from 'react'
import { Container } from '@chakra-ui/react'

import Navbar from '../Navbar'

interface Props {
  title?: string
  children: ReactNode
  mt?: string
}

export default function Base({
  children,
  title = 'Presalano',
  mt = '8rem',
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Native token launchpad for cardano" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container maxW={'7xl'} mt={mt} px={0}>
        {children}
      </Container>
    </>
  )
}
