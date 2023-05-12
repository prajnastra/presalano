import { useState, useContext, createContext, ReactNode } from 'react'
import { WalletApi, Lucid } from 'lucid-cardano'

interface Props {
  children: ReactNode
}

interface WalletContextType {
  wallet: WalletApi | undefined
  account: string
  connecting: boolean
  connected: boolean
  connectWallet: () => void
}

const WalletContext = createContext<WalletContextType>(null!)

export const useWallet = () => useContext(WalletContext)

export const WalletProvider = ({ children }: Props) => {
  const [wallet, setWallet] = useState<WalletApi>()
  const [connecting, setConnecting] = useState<boolean>(false)
  const [connected, setConnected] = useState<boolean>(false)
  const [account, setAccount] = useState<string>('')

  const getWalletAddress = async (api: WalletApi): Promise<string> => {
    const lucid = await Lucid.new()
    lucid.selectWallet(api)
    return await lucid.wallet.address()
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
      value={{ wallet, account, connecting, connectWallet, connected }}
    >
      {children}
    </WalletContext.Provider>
  )
}
