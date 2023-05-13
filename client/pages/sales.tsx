import { SimpleGrid, useColorModeValue } from '@chakra-ui/react'

import Base from '../components/Base'
import Loader from '../components/Loader'
import { SaleCard } from '../components/Card'

export default function Sales() {
  return (
    <>
      <Base title="Presalano: Ongoing sales">
        <Loader minH={'200px'} />
        <SimpleGrid
          columns={{ base: 1, md: 3, lg: 4 }}
          gap="1rem"
          bg={useColorModeValue('white', 'gray.800')}
          m="4rem 0"
        >
          {new Array(5).fill(0).map((dat, idx) => (
            <SaleCard key={idx + '-df-'} />
          ))}
        </SimpleGrid>
      </Base>
    </>
  )
}
