import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Lucid, Blockfrost, fromText } from 'lucid-cardano'
import swal from 'sweetalert'

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
import { getBlockForestInfo } from '../../utils'

interface Inputs {
  name: string
  total_supply: number
}

export default function Minter() {
  const router = useRouter()
  const { connected, network, wallet } = useWallet()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!network || !wallet) return
    const info = getBlockForestInfo(network)

    const lucid = await Lucid.new(new Blockfrost(info.api, info.key), network)

    lucid.selectWallet(wallet)

    const { paymentCredential } = lucid.utils.getAddressDetails(
      await lucid.wallet.address()
    )

    const mintingPolicy = lucid.utils.nativeScriptFromJson({
      type: 'all',
      scripts: [
        { type: 'sig', keyHash: paymentCredential!.hash },
        {
          type: 'before',
          slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
        },
      ],
    })

    const policyId = lucid.utils.mintingPolicyToId(mintingPolicy)
    const unit = policyId + fromText(data.name)

    const tx = await lucid
      .newTx()
      .mintAssets({ [unit]: BigInt(data.total_supply) })
      .validTo(Date.now() + 200000)
      .attachMintingPolicy(mintingPolicy)
      .complete()

    const signedTx = await tx.sign().complete()

    const txHash = await signedTx.submit()

    console.log(txHash)
    swal(
      'Congratulations!',
      `${data.total_supply} ${data.name} minted...`,
      'success',
      {
        buttons: {
          catch: {
            text: 'View Tx',
            value: 'view',
          },
          close: true,
        },
      }
    ).then((value) => {
      switch (value) {
        case 'view':
          router.push(`${info.explorer}/transaction/${txHash}`)
          break
        default:
          return
      }
    })
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

            <Box
              borderWidth="1px"
              rounded="lg"
              maxWidth={800}
              p={6}
              m="10px auto"
            >
              <FormControl
                id="token-name-input"
                mt="4%"
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
                mt="4%"
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

              <Stack spacing={6} pt={3} mt="4%">
                <Button
                  rounded={'full'}
                  colorScheme="messenger"
                  variant={'solid'}
                  size="lg"
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={!connected}
                >
                  Mint
                </Button>
              </Stack>
            </Box>
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
