import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Button,
  Select,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaWallet } from 'react-icons/fa'

import ChakraNextLink from '../ChakraNextLink'
import { useWallet } from '../../context'
import { Network } from '../../types'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    connecting,
    connectWallet,
    connected,
    account,
    network,
    changeNetwork,
  } = useWallet()

  const hoverColor = useColorModeValue('gray.200', 'gray.700')

  const Links = [
    {
      label: 'Minter',
      href: '/minter',
    },
    {
      label: 'Launchpad',
      href: '/launchpad',
    },
    {
      label: 'Ongoing Sales',
      href: '/sales',
    },
  ]

  return (
    <Box pos="fixed" top="0" w="100%" zIndex={10}>
      <Container
        maxW={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        borderBottom="1px"
        borderColor={useColorModeValue('gray.300', 'gray.700')}
      >
        <Box maxWidth={'7xl'} mx="auto">
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
                  <Heading as="h1" size="md">
                    Presalano
                  </Heading>
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
                    px={3}
                    py={1}
                    rounded={'full'}
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
              <Stack direction={'row'} spacing={2}>
                <Select
                  value={network || Network.Mainnet}
                  maxW="120px"
                  rounded={'full'}
                  onChange={(e) => changeNetwork(e.target.value as Network)}
                >
                  <option value={Network.Mainnet}>Mainnet</option>
                  <option value={Network.Preprod}>Preprod</option>
                  <option value={Network.Preview}>Preview</option>
                </Select>

                <Button onClick={toggleColorMode} variant="ghost">
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>

                {connected ? (
                  <Button rounded={'full'} isDisabled={true}>{`${account.slice(
                    0,
                    7
                  )}...${account.slice(100)}`}</Button>
                ) : (
                  <Button
                    rounded={'full'}
                    colorScheme={'messenger'}
                    variant={'outline'}
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
