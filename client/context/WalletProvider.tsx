import { useState, useContext, createContext, ReactNode } from 'react'
import { WalletApi, Lucid } from 'lucid-cardano'

import { useLocalStorage } from '../hooks'
import { Network } from '../types'

interface Props {
  children: ReactNode
}

interface WalletContextType {
  wallet: WalletApi | undefined
  account: string
  network: Network | null
  connecting: boolean
  connected: boolean
  connectWallet: () => void
  changeNetwork: (network: Network) => void
}

const WalletContext = createContext<WalletContextType>(null!)

export const useWallet = () => useContext(WalletContext)

export const WalletProvider = ({ children }: Props) => {
  const [wallet, setWallet] = useState<WalletApi>()
  const [connecting, setConnecting] = useState<boolean>(false)
  const [connected, setConnected] = useState<boolean>(false)
  const [account, setAccount] = useState<string>('')
  const [network, setNetwork] = useLocalStorage<Network>(
    'PRESALANO-NETWORK',
    Network.Mainnet
  )

  const getWalletAddress = async (api: WalletApi): Promise<string> => {
    const lucid = await Lucid.new()
    lucid.selectWallet(api)
    return await lucid.wallet.address()
  }

  const changeNetwork = (net: Network) => {
    if (typeof setNetwork === 'function') {
      setNetwork(net)
    }
  }

  const connectWallet = async () => {
    try {
      setConnecting(true)
      const api = await window.cardano.nami.enable()
      setWallet(api)
      setAccount(await getWalletAddress(api))
      setConnected(true)
      setConnecting(false)
    } catch (e) {
      setConnecting(false)
      setConnected(false)
      console.error(e)
      alert('Wallet Connect :: Someting error occured')
    }
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        account,
        connecting,
        connectWallet,
        connected,
        network,
        changeNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
