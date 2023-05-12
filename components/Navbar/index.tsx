import type { NextComponentType } from 'next'

import {
  Box,
  Container,
  Flex,
  Image,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaWallet } from 'react-icons/fa'

import ChakraNextLink from '../ChakraNextLink'
import { useWallet } from '../../context'

const Footer: NextComponentType = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { connecting, connectWallet, connected, account } = useWallet()

  const hoverColor = useColorModeValue('gray.200', 'gray.700')
  const logoSrcMd = useColorModeValue('/black_logo.png', '/logo.png')
  const logoSrcSm = useColorModeValue(
    '/logo_white_sm.png',
    '/logo_white_sm.png'
  )

  const Links = [
    {
      label: 'Marketplace',
      href: '/marketplace',
    },
    {
      label: 'Mint NFT',
      href: '/mint/nft',
    },
    {
      label: 'Mint Native Token',
      href: '/mint/token',
    },
    {
      label: 'Auction NFT',
      href: '/auction',
    },
  ]

  return (
    <Box pos="fixed" top="0" w="100%" zIndex={10}>
      <Container
        maxW={'full'}
        bg={useColorModeValue('gray.50', 'gray.900')}
        borderRadius="lg"
        border="1px"
        borderColor={useColorModeValue('gray.300', 'gray.700')}
      >
        <Box px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Box ml={['10px', 0]}>
                <ChakraNextLink
                  href="/"
                  display="flex"
                  alignItems="center"
                  fontSize="1.2rem"
                  fontWeight="600"
                >
                  <picture>
                    <source media="(max-width: 768px)" srcSet={logoSrcSm} />
                    <Image
                      src={logoSrcMd}
                      width={['2.5rem', '7rem']}
                      height={['1.5rem', '2.5rem']}
                      alt="Logo"
                    />
                  </picture>
                </ChakraNextLink>
              </Box>

              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {Links.map((link, idx) => (
                  <ChakraNextLink
                    key={idx + '-desktop-nav'}
                    href={link.href}
                    px={2}
                    py={1}
                    rounded={'md'}
                    fontSize={['1rem', '1rem', '0.6rem', '1rem']}
                    _hover={{
                      textDecoration: 'none',
                      bg: hoverColor,
                    }}
                  >
                    {link.label}
                  </ChakraNextLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <Button onClick={toggleColorMode} variant="ghost">
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
                {connected ? (
                  <Button isDisabled={true}>{`${account.slice(
                    0,
                    7
                  )}...${account.slice(100)}`}</Button>
                ) : (
                  <Button
                    colorScheme="blue"
                    onClick={connectWallet}
                    isLoading={connecting}
                    rightIcon={<FaWallet />}
                  >
                    Connect Wallet
                  </Button>
                )}
              </Stack>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link, idx) => (
                  <ChakraNextLink
                    key={idx + '-mobile-nav'}
                    href={link.href}
                    px={2}
                    py={1}
                    rounded={'md'}
                    _hover={{
                      textDecoration: 'none',
                      bg: hoverColor,
                    }}
                  >
                    {link.label}
                  </ChakraNextLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
