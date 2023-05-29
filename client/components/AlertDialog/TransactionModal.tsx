import { useRef } from 'react'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  CircularProgress,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { BsUpload } from 'react-icons/bs'
import ChakraNextLink from '../ChakraNextLink'

interface Props {
  explorer: string
  info?: string
  loading: boolean
  isOpen: boolean
  onClose: () => void
}

export default function TransactionModal({
  isOpen,
  onClose,
  explorer,
  info,
  loading,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const iconColor = useColorModeValue('black', 'white')

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent p={'1rem'}>
          <AlertDialogBody
            display={'flex'}
            flexDir="column"
            alignItems={'center'}
            justifyContent={'center'}
            mt={'2rem'}
          >
            {loading ? (
              <CircularProgress
                isIndeterminate
                color="messenger.500"
                size="90px"
              />
            ) : (
              <BsUpload color={iconColor} fontSize={'5rem'} />
            )}
          </AlertDialogBody>

          <AlertDialogHeader
            fontSize="lg"
            fontWeight="normal"
            textAlign={'center'}
            pb="1"
          >
            Transaction Submitted
          </AlertDialogHeader>

          <Text textAlign={'center'}>{info}</Text>

          <AlertDialogFooter
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Button ref={cancelRef} onClick={onClose}>
              Close
            </Button>

            <ChakraNextLink href={explorer} target="_blank">
              <Button colorScheme="messenger" onClick={onClose} ml={3}>
                View
              </Button>
            </ChakraNextLink>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
