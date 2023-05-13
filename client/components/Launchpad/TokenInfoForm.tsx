import {
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react'

import { useWallet } from '../../context'

export default function TokenInfoForm() {
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
        Token Info
      </Heading>

      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="token-name-input" fontWeight={'normal'}>
            Token Name
          </FormLabel>
          <Input
            id="token-name-input"
            placeholder="Token name"
            type="text"
            rounded={'full'}
            isDisabled={!connected}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="total-supply-input" fontWeight={'normal'}>
            Total Supply
          </FormLabel>
          <Input
            id="total-supply-input"
            placeholder="0"
            type="number"
            rounded={'full'}
            isDisabled={!connected}
          />
        </FormControl>
      </Flex>

      <FormControl mt="2%">
        <FormLabel htmlFor="policy-id-input" fontWeight={'normal'}>
          Policy Id
        </FormLabel>
        <Input
          id="policy-id-input"
          type="text"
          rounded={'full'}
          placeholder="d343aa89662da4d1367268a573660b57ef6c62ff235f51d035f43531"
          isDisabled={!connected}
        />
        <FormHelperText>Put your native token policy id</FormHelperText>
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="logo-url-input" fontWeight={'normal'}>
          Logo URL
        </FormLabel>
        <Input
          id="logo-url-input"
          type="text"
          placeholder="https://example.com/logo.svg"
          isDisabled={!connected}
          rounded={'full'}
        />
        <FormHelperText>
          URL must end with a supported image extension png, jpg, jpeg or gif
        </FormHelperText>
      </FormControl>
    </>
  )
}
