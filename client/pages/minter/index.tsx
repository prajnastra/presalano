import { useForm, SubmitHandler } from 'react-hook-form'
// import swal from 'sweetalert'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react'

import Base from '../../components/Base'

import { useWallet } from '../../context'

interface Inputs {
  name: string
  total_supply: number
}

export default function Minter() {
  const { connected } = useWallet()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
  }

  return (
    <Base title="Presalano: Minter">
      <Stack minH={'70vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex
          p={8}
          flex={1}
          align={'center'}
          justify={'center'}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Mint tokens with presalano</Heading>
            <FormControl
              id="token-name-input"
              isInvalid={errors.name ? true : false}
            >
              <FormLabel>Token Name</FormLabel>

              <Input
                type="text"
                rounded={'full'}
                isDisabled={!connected || isSubmitting}
                {...register('name', { required: 'Name is required' })}
              />

              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              id="token-supply-input"
              isInvalid={errors.total_supply ? true : false}
            >
              <FormLabel>Total Supply</FormLabel>
              <Input
                type="number"
                rounded={'full'}
                isDisabled={!connected || isSubmitting}
                {...register('total_supply', {
                  required: 'Total supply is required',
                })}
              />

              <FormErrorMessage>
                {errors.total_supply && errors.total_supply.message}
              </FormErrorMessage>
            </FormControl>

            <Stack spacing={6} pt={3}>
              <Button
                rounded={'full'}
                bg={'messenger.500'}
                color="white"
                _hover={{ bg: 'messenger.600' }}
                variant={'solid'}
                size="lg"
                type="submit"
                isLoading={isSubmitting}
                isDisabled={!connected}
              >
                Mint
              </Button>
            </Stack>
          </Stack>
        </Flex>

        <Flex flex={1}>
          <Box
            position={'relative'}
            rounded={'2xl'}
            width={'full'}
            overflow={'hidden'}
          >
            <Image
              alt={'Login Image'}
              src={'/banner.svg'}
              w={'100%'}
              h={'100%'}
            />
          </Box>
        </Flex>
      </Stack>
    </Base>
  )
}
