import { Box } from '@chakra-ui/react'

import Base from '../components/Base'
import Hero from '../components/Hero'
import Stats from '../components/Stats'

export default function Home() {
  return (
    <>
      <Base title="Presalano: Home">
        <Hero />
        <Stats />
        <Box mt="5rem" h="10"></Box>
      </Base>
    </>
  )
}
