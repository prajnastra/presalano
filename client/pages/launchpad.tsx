import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Textarea,
} from '@chakra-ui/react'
import Base from '../components/Base'

export default function Launchpad() {
  return (
    <>
      <Base title="Presalano: Launchpad">
        <Stack minH={'70vh'} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
              <Heading fontSize={'2xl'}>Presalano launchpad</Heading>
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
    </>
  )
}
