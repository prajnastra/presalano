import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { WalletProvider } from '../context/WalletProvider'
import { theme } from '../theme'
import '@fontsource/poppins'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </ChakraProvider>
  )
}
