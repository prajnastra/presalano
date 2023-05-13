import { Heading, FormControl, FormLabel, Input, Flex } from '@chakra-ui/react'

import { useWallet } from '../../context'

export default function PresaleRateForm() {
  const { connected } = useWallet()

  return (
    <>
      <Heading
        w="100%"
        textAlign={'center'}
        fontWeight="normal"
        mb="2%"
        fontSize={'xl'}
      >
        Presale Info
      </Heading>

      <FormControl mt="3%">
        <FormLabel htmlFor="token-per-ada-input" fontWeight={'normal'}>
          Token Per Ada
        </FormLabel>
        <Input
          id="token-per-ada-input"
          type="number"
          isDisabled={!connected}
          rounded={'full'}
          placeholder="0"
        />
      </FormControl>

      <FormControl mt="3%">
        <FormLabel htmlFor="min-ada-input" fontWeight={'normal'}>
          Min Buy (Ada)
        </FormLabel>
        <Input
          id="min-ada-input"
          type="number"
          isDisabled={!connected}
          rounded={'full'}
          placeholder="0"
        />
      </FormControl>

      <FormControl mt="3%">
        <FormLabel htmlFor="max-buy-input" fontWeight={'normal'}>
          Max Buy (Ada)
        </FormLabel>
        <Input
          id="max-buy-input"
          type="number"
          isDisabled={!connected}
          rounded={'full'}
          placeholder="0"
        />
      </FormControl>

      <Flex mt="3%">
        <FormControl mr="5%">
          <FormLabel htmlFor="max-buy-input" fontWeight={'normal'}>
            Start Time
          </FormLabel>
          <Input
            id="max-buy-input"
            type="number"
            isDisabled={!connected}
            rounded={'full'}
            placeholder="0"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="max-buy-input" fontWeight={'normal'}>
            End Time
          </FormLabel>
          <Input
            id="max-buy-input"
            type="number"
            rounded={'full'}
            isDisabled={!connected}
            placeholder="0"
          />
        </FormControl>
      </Flex>
    </>
  )
}
