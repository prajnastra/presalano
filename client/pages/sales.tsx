import useSWR from 'swr'

import { SimpleGrid, useColorModeValue } from '@chakra-ui/react'

import Base from '../components/Base'
import Loader from '../components/Loader'
import { SaleCard } from '../components/Card'
import { getAllSalesAPI } from '../api'

export default function Sales() {
  const { data, error, isLoading } = useSWR('/api/sales', (url) =>
    getAllSalesAPI(url)
  )
  return (
    <>
      <Base title="Presalano: Ongoing sales">
        {isLoading && <Loader minH={'250px'} />}

        <SimpleGrid
          columns={{ base: 1, md: 3, lg: 4 }}
          gap="1rem"
          bg={useColorModeValue('white', 'gray.800')}
          m="4rem 0"
          minH={'75vh'}
        >
          {data && data.map((sale) => <SaleCard key={sale._id} sale={sale} />)}
        </SimpleGrid>
      </Base>
    </>
  )
}
