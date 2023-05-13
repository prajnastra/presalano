import { Heading, FormControl, FormLabel, Input } from '@chakra-ui/react'

export default function PresaleInfoForm() {
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
        <FormLabel htmlFor="tier-1-amount-input" fontWeight={'normal'}>
          Tier 1 *(Per Ada)
        </FormLabel>
        <Input id="tier-1-amount-input" type="number" placeholder="0" />
      </FormControl>

      <FormControl mt="3%">
        <FormLabel htmlFor="tier-2-amount-input" fontWeight={'normal'}>
          Tier 2 *(Per Ada)
        </FormLabel>
        <Input id="tier-2-amount-input" type="number" placeholder="0" />
      </FormControl>

      <FormControl mt="3%">
        <FormLabel htmlFor="public-amount-input" fontWeight={'normal'}>
          Public *(Per Ada)
        </FormLabel>
        <Input id="public-amount-input" type="number" placeholder="0" />
      </FormControl>
    </>
  )
}
