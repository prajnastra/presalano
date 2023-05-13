import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Badge,
  Grid,
  Image,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Flex,
  UnorderedList,
  Input,
  Stack,
  FormControl,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaDiscord, FaTelegram, FaTwitter, FaLink } from 'react-icons/fa'

import SocialButton from '../../components/Footer/SocialButton'
import Base from '../../components/Base'

import { useWallet } from '../../context'

export default function SaleInfo() {
  const router = useRouter()
  const { id } = router.query
  const { connected } = useWallet()

  return (
    <Base title="Presalano: Sale Info">
      <Grid templateColumns={['repeat(1, 1fr)', '1fr 1fr']} gap="1rem" mb={10}>
        <Box
          border={'1px'}
          borderRadius={'lg'}
          borderColor={useColorModeValue('gray.300', 'gray.700')}
          p={6}
        >
          <Flex>
            <Image
              src={'#'}
              rounded="md"
              fallbackSrc={'https://via.placeholder.com/300x300?text=Not+Found'}
              alt={'Test'}
              w={[50, 100]}
              h={[50, 100]}
              mr="5%"
            />

            <Flex justify={'space-between'} flexDir={'column'}>
              <Flex justify={'space-between'} align={'center'}>
                <Heading as="h3" size="lg">
                  Test
                </Heading>
                <Badge
                  ml="1"
                  fontSize={'1rem'}
                  colorScheme={true ? 'red' : 'green'}
                >
                  {true ? 'Closed' : 'Ongoing'}
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

          <Text fontSize="md" mt="5%">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
            soluta.
            {/*data?.data.description && sliceString(data?.data.description)*/}
          </Text>

          <UnorderedList spacing={1} mt="5%">
            <ListItem>
              Owner: {/*data?.data.owner && sliceString(data.data.owner)*/}
              {/*data?.data.owner && <CopyButton data={data.data.owner} />*/}
            </ListItem>

            <ListItem>
              Token Per Ada: 1000{' '}
              {/*data?.data.winner && sliceString(data.data.winner)*/}
              {/*data?.data.winner && <CopyButton data={data.data.winner} />*/}
            </ListItem>

            <ListItem>Min Buy: 300 Ada</ListItem>

            <ListItem>Max Buy: 1000 Ada</ListItem>

            <ListItem>
              Start Date:{' '}
              {/*data?.data.start_time &&
                  moment(data.data.start_time).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  )*/}
            </ListItem>

            <ListItem>
              End Date:{' '}
              {/*data?.data.end_time &&
                  moment(data.data.end_time).format('MMMM Do YYYY, h:mm:ss a')*/}
            </ListItem>
          </UnorderedList>
        </Box>

        <Box
          borderRadius={'lg'}
          border={'1px'}
          borderColor={useColorModeValue('gray.300', 'gray.700')}
          p={6}
        >
          <Heading fontSize={'2xl'}>Contribute</Heading>
          <Stack
            direction={['column', 'row']}
            w={{ base: '100%', md: '80%' }}
            as="form"
            mt="3%"
          >
            <FormControl id="nft-bid-amount-input">
              <Input
                pr="4.5rem"
                type="number"
                placeholder="Enter amount"
                size="lg"
                isDisabled={!connected}
              />

              <FormErrorMessage>
                {/*errors.bid_amount && errors.bid_amount.message*/}
              </FormErrorMessage>
            </FormControl>

            <Button
              size="lg"
              type="submit"
              colorScheme="messenger"
              isDisabled={!connected}
            >
              Contribute
            </Button>
            {/*data?.data.winner === account ? (
                      {...register('bid_amount', {
                        required: 'Bid amount is required',
                      })}
                data.data.closed && (
                  <Button
                    isDisabled={!connected}
                    size="lg"
                    colorScheme="blue"
                    onClick={processPayment}
                  >
                    Transfer Amount
                  </Button>
                )
              ) : (
                <>
                </>
              )*/}
          </Stack>

          <Stack mt="8%" gap={3} direction={'row'}>
            <Button size="lg" colorScheme="red" isDisabled={!connected}>
              Withdraw
            </Button>
            <Button size="lg" colorScheme="green" isDisabled={!connected}>
              Finalize
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Base>
  )
}
