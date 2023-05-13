import { useState } from 'react'
import { uploadFromFileInput } from '../third-party/nft-storage'

export const useIpfsFileUploader = () => {
  const [fileHash, setFileHash] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const uploadToIpfs = async (apiKey: string, file: any) => {
    setIsLoading(true)
    try {
      const cid = await uploadFromFileInput(apiKey, file)
      setFileHash(cid)
    } catch (e) {
      setError('Not able to upload')
    }
    setIsLoading(false)
  }

  return { uploadToIpfs, isLoading, fileHash, error }
}
