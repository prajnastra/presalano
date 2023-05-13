import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  HStack,
  Input,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'

import { FaDiscord, FaTelegram, FaTwitter } from 'react-icons/fa'
import { BiMailSend } from 'react-icons/bi'

import ListHeader from './ListHeader'
import SocialButton from './SocialButton'

export default function Footer() {
  return (
    <Box
      mt={'4rem'}
      bg={useColorModeValue('white', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop="1px"
      borderColor={useColorModeValue('gray.300', 'gray.700')}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <HStack spacing={1}>
              <Text color={useColorModeValue('gray.700', 'white')}>
                Presalano
              </Text>
            </HStack>

            <Text fontSize={'sm'}>© 2022 Presalano. All rights reserved</Text>

            <Stack direction={'row'} spacing={6}>
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
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link href={'#'}>Blog</Link>
            <Link href={'#'}>About us</Link>
            <Link href={'#'}>Contact us</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'#'}>Help Center</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Privacy Policy</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={'row'}>
              <Input
                placeholder={'Your email address'}
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                colorScheme={'messenger'}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
