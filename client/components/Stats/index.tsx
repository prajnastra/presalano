import { Box, chakra, SimpleGrid } from '@chakra-ui/react'

import { TbMoneybag } from 'react-icons/tb'
import { BsRecordCircle } from 'react-icons/bs'
import { HiOutlineChartBar } from 'react-icons/hi'

import StatsCard from './StatsCard'

export default function Stats() {
  return (
    <Box
      maxW="7xl"
      mx={'auto'}
      my={'5rem'}
      pt={5}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}
      >
        Presalano Stats
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'Token Minted'}
          stat={'~'}
          icon={<TbMoneybag size={'3em'} />}
        />
        <StatsCard
          title={'Ongoing Sales'}
          stat={'~'}
          icon={<BsRecordCircle size={'3em'} />}
        />
        <StatsCard
          title={'Total Sales'}
          stat={'~'}
          icon={<HiOutlineChartBar size={'3em'} />}
        />
      </SimpleGrid>
    </Box>
  )
}
