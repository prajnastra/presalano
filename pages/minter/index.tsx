import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'
import Base from '../../components/Base'

export default function Minter() {
  return (
    <Base>
      <Stack minH={'70vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Mint tokens with presalano</Heading>
            <FormControl id="token-name-input">
              <FormLabel>Token Name</FormLabel>
              <Input type="text" rounded={'full'} />
            </FormControl>

            <FormControl id="token-supply-input">
              <FormLabel>Total Supply</FormLabel>
              <Input type="number" rounded={'full'} />
            </FormControl>

            <Stack spacing={6} pt={3}>
              <Button
                rounded={'full'}
                bg={'messenger.500'}
                color="white"
                _hover={{ bg: 'messenger.600' }}
                variant={'solid'}
                size="lg"
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
