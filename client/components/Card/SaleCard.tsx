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

interface Props {}

export default function SaleCard({}: Props) {
  const { timeRemaining, minutesRemaining, secondsRemaining } = useCountDown(
    moment()
  )

  return (
    <Box
      role={'group'}
      p={6}
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.700')}
      pos="relative"
      boxShadow={'2xl'}
      rounded={'lg'}
      zIndex={1}
      mx="auto"
    >
      <Flex gap={5}>
        <Image
          rounded={'md'}
          height={70}
          width={70}
          objectFit={'cover'}
          src={'#'}
          fallbackSrc={'https://via.placeholder.com/300x300?text=Not+Found'}
        />

        <Flex justify={'space-between'} flexDir={'column'}>
          <Flex justify={'space-between'} alignItems={'center'}>
            <Heading fontSize={'xl'} fontWeight={600}>
              {/* data.name */}
              Testing
            </Heading>

            <Badge
              ml="1"
              fontSize="0.8em"
              bg={false ? 'red.200' : 'green.200'}
              color={false ? 'red.900' : 'green.900'}
              top={2}
              right={2}
            >
              {false ? 'Closed' : 'Live'}
            </Badge>
          </Flex>

          <Stack direction={'row'} spacing={3}>
            <SocialButton label={'Website'} href={'#'}>
              <FaLink />
            </SocialButton>

            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>

            <SocialButton label={'Discord'} href={'#'}>
              <FaDiscord />
            </SocialButton>

            <SocialButton label={'Telegram'} href={'#'}>
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
              {Math.floor(timeRemaining ? timeRemaining.asHours() : 0)} hours{' '}
              {minutesRemaining} minutes {secondsRemaining} seconds{' '}
            </>
          )}
        </Text>

        <Text
          color={'gray.500'}
          fontSize={'sm'}
          textTransform={'uppercase'}
          textAlign={'justify'}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
      </Stack>

      <ChakraNextLink href={`/nft/${''}`}>
        <Button
          w={'full'}
          mt={5}
          rounded={'full'}
          colorScheme="messenger"
          variant={'outline'}
          size="lg"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
        >
          Make a bid
        </Button>
      </ChakraNextLink>

      <Stack direction={'row'} align={'center'}></Stack>
    </Box>
  )
}
