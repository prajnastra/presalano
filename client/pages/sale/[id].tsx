import { useRouter } from 'next/router'
import { useEffect } from 'react'
import moment from 'moment'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import {
  Box,
  Button,
  Badge,
  Grid,
  Image,
  Heading,
  Text,
  ListItem,
  Flex,
  UnorderedList,
  Input,
  Stack,
  FormControl,
  FormErrorMessage,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { FaDiscord, FaTelegram, FaTwitter, FaLink } from 'react-icons/fa'

import SocialButton from '../../components/Footer/SocialButton'
import Loader from '../../components/Loader'
import Base from '../../components/Base'

import { useWallet } from '../../context'
import { getASaleInfoAPI, updateSaleAPI } from '../../api'
import { sliceString } from '../../utils'
import CopyButton from '../../components/CopyButton'

export default function SaleInfo() {
  const router = useRouter()
  const { id } = router.query
  const toast = useToast()
  const { connected, account } = useWallet()
  const {
    trigger,
    isMutating,
    data: updateRes,
  } = useSWRMutation(`/api/sale/${id}`, updateSaleAPI)
  const { data, error, isLoading } = useSWR(`/api/sale/${id}`, (url) =>
    getASaleInfoAPI(url)
  )

  useEffect(() => {
    console.log(error?.message)
  }, [error])

  useEffect(() => {
    if (updateRes) {
      toast({
        title: `Sale is finalized...`,
        position: 'top-right',
        isClosable: true,
      })
    }
  }, [updateRes])

  return (
    <Base title="Presalano: Sale Info">
      {isLoading && <Loader minH={'250px'} />}

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
                  {data?.token_name}
                </Heading>
                <Badge
                  ml="1"
                  fontSize={'1rem'}
                  colorScheme={data?.is_close ? 'red' : 'green'}
                >
                  {data?.is_close ? 'Closed' : 'Ongoing'}
                </Badge>
              </Flex>

              <Stack direction={'row'} spacing={3}>
                <SocialButton label={'Website'} href={data?.website || '#'}>
                  <FaLink />
                </SocialButton>

                <SocialButton label={'Twitter'} href={data?.twitter || '#'}>
                  <FaTwitter />
                </SocialButton>

                <SocialButton label={'Discord'} href={data?.discord || '#'}>
                  <FaDiscord />
                </SocialButton>

                <SocialButton label={'Telegram'} href={data?.telegram || '#'}>
                  <FaTelegram />
                </SocialButton>
              </Stack>
            </Flex>
          </Flex>

          <Text fontSize="md" mt="5%">
            {data?.description && sliceString(data.description)}
          </Text>

          <UnorderedList spacing={1} mt="5%">
            <ListItem>
              Owner: {data?.owner && sliceString(data.owner)}
              {data?.owner && <CopyButton data={data.owner} />}
            </ListItem>

            <ListItem>Token Per Ada: {data?.token_per_ada}</ListItem>

            <ListItem>Min Buy: {data?.min_buy} Ada</ListItem>

            <ListItem>Max Buy: {data?.max_buy} Ada</ListItem>

            <ListItem>
              Start Date:{' '}
              {data?.start_time &&
                moment(data.start_time).format('MMMM Do YYYY, h:mm:ss a')}
            </ListItem>

            <ListItem>
              End Date:{' '}
              {data?.end_time &&
                moment(data.end_time).format('MMMM Do YYYY, h:mm:ss a')}
            </ListItem>
          </UnorderedList>
        </Box>

        <Box
          borderRadius={'lg'}
          border={'1px'}
          borderColor={useColorModeValue('gray.300', 'gray.700')}
          p={6}
          pos="relative"
        >
          {data?.is_close && (
            <Box
              pos={'absolute'}
              w="100%"
              h="100%"
              bg="blackAlpha.50"
              backdropFilter={'blur(3px)'}
              top="0"
              left="0"
              zIndex={100}
              display={'flex'}
              justifyContent="center"
              alignItems={'center'}
            >
              <Heading fontSize={'2xl'}>The Sale is Closed</Heading>
            </Box>
          )}

          {data?.owner !== account && (
            <>
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
                  variant={'outline'}
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
            </>
          )}

          <Stack gap={3} direction={'row'}>
            {data?.owner === account && (
              <Button
                size="lg"
                colorScheme="green"
                isDisabled={!connected}
                variant={'outline'}
                isLoading={isMutating}
                onClick={() => {
                  trigger({ is_close: true })
                }}
              >
                Finalize Sale
              </Button>
            )}
          </Stack>
        </Box>
      </Grid>
    </Base>
  )
}
