import moment from 'moment'

import {
  Box,
  Button,
  Badge,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaDiscord, FaTelegram, FaTwitter, FaLink } from 'react-icons/fa'

import ChakraNextLink from '../ChakraNextLink'
import SocialButton from '../Footer/SocialButton'

import { useCountDown } from '../../hooks'
import { Sale } from '../../api'
import { sliceString } from '../../utils'

interface Props {
  sale: Sale
}

export default function SaleCard({ sale }: Props) {
  const { timeRemaining, minutesRemaining, secondsRemaining } = useCountDown(
    moment(sale.end_time)
  )

  return (
    <Box
      role={'group'}
      p={6}
      maxW={'330px'}
      maxH={'290px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      pos="relative"
      boxShadow={'sm'}
      rounded={'lg'}
      zIndex={1}
      mx="auto"
      border={'1px'}
      borderRadius={'lg'}
      borderColor={useColorModeValue('gray.300', 'gray.700')}
    >
      <Flex gap={5}>
        <Image
          rounded={'md'}
          height={70}
          width={70}
          objectFit={'cover'}
          src={sale.logo_url}
          fallbackSrc={'https://via.placeholder.com/300x300?text=Not+Found'}
        />

        <Flex justify={'space-between'} flexDir={'column'}>
          <Flex justify={'space-between'} alignItems={'center'}>
            <Heading fontSize={'xl'} fontWeight={600}>
              {sale.token_name}
            </Heading>

            <Badge
              ml="1"
              fontSize="0.8em"
              bg={sale.is_close ? 'red.200' : 'green.200'}
              color={sale.is_close ? 'red.900' : 'green.900'}
              top={2}
              right={2}
            >
              {sale.is_close ? 'Closed' : 'Ongoing'}
            </Badge>
          </Flex>

          <Stack direction={'row'} spacing={3}>
            <SocialButton label={'Website'} href={sale.website}>
              <FaLink />
            </SocialButton>

            <SocialButton label={'Twitter'} href={sale.twitter}>
              <FaTwitter />
            </SocialButton>

            <SocialButton label={'Discord'} href={sale.discord}>
              <FaDiscord />
            </SocialButton>

            <SocialButton label={'Telegram'} href={sale.telegram}>
              <FaTelegram />
            </SocialButton>
          </Stack>
        </Flex>
      </Flex>

      <Stack mt={5} align={'center'} gap={5}>
        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
          {false ? (
            '0 HOURS 0 MINUTES 0 SECONDS'
          ) : (
            <>
              {/* { Math.floor(timeRemaining ? timeRemaining.asHours() : 0)} hours{' '}
              {minutesRemaining} minutes {secondsRemaining} seconds{' '} */}
            </>
          )}
        </Text>

        <Text
          color={'gray.500'}
          fontSize={'sm'}
          textTransform={'uppercase'}
          textAlign={'left'}
          minH={'50px'}
        >
          {sliceString(sale.description, 100)}
        </Text>
      </Stack>

      <ChakraNextLink href={`/sale/${sale._id}`}>
        <Button
          w={'full'}
          mt={5}
          rounded={'full'}
          colorScheme="messenger"
          variant={'outline'}
          size="md"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
        >
          Contribute
        </Button>
      </ChakraNextLink>
    </Box>
  )
}
