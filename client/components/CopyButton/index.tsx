import { IconButton } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'

interface Props {
  data: string
}

export default function CopyButton({ data }: Props) {
  return (
    <IconButton
      aria-label="Copy"
      icon={<CopyIcon />}
      size="xs"
      ml={2}
      onClick={() => {
        navigator.clipboard.writeText(data)
      }}
    />
  )
}
