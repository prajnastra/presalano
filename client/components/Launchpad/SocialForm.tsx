import { Heading, FormControl, FormLabel, Input } from '@chakra-ui/react'

import { useWallet } from '../../context'

export default function SocialForm() {
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
        Social
      </Heading>

      <FormControl mt="2%">
        <FormLabel htmlFor="website-input" fontWeight={'normal'}>
          Website
        </FormLabel>
        <Input
          id="website-input"
          type="text"
          placeholder="https://example.com"
          rounded={'full'}
          isDisabled={!connected}
        />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="twitter-input" fontWeight={'normal'}>
          Twitter
        </FormLabel>
        <Input
          id="twitter-input"
          placeholder="https://twitter.com/example"
          isDisabled={!connected}
          rounded={'full'}
        />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="discord-input" fontWeight={'normal'}>
          Discord
        </FormLabel>
        <Input
          id="discord-input"
          placeholder="https://discord.com/sud8dj"
          isDisabled={!connected}
          rounded={'full'}
        />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="telegram-input" fontWeight={'normal'}>
          Telegram
        </FormLabel>
        <Input
          id="telegram-input"
          type="text"
          placeholder="https://t.me/txf"
          isDisabled={!connected}
          rounded={'full'}
        />
      </FormControl>
    </>
  )
}
