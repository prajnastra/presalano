import { UseFormRegister, FieldErrors } from 'react-hook-form'

import {
  Heading,
  FormControl,
  Flex,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

import { useWallet } from '../../context'
import { LauncpadInputs } from '../../types'

interface Props {
  register: UseFormRegister<LauncpadInputs>
  errors: FieldErrors<LauncpadInputs>
  isDisabled: boolean
}

export default function SocialForm({ register, errors, isDisabled }: Props) {
  const { connected } = useWallet()

  return (
    <>
      <Heading
        w="100%"
        textAlign={'center'}
        fontWeight="normal"
        mb="2%"
        fontSize={'xl'}
      >
        Social
      </Heading>

      <FormControl mt="2%" isInvalid={errors.website ? true : false}>
        <FormLabel htmlFor="website-input" fontWeight={'normal'}>
          Website
        </FormLabel>
        <Input
          id="website-input"
          type="text"
          placeholder="https://example.com"
          rounded={'full'}
          isDisabled={!connected || isDisabled}
          {...register('website', { required: 'Website is required' })}
        />
        <FormErrorMessage>
          {errors.website && errors.website.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt="3%" isInvalid={errors.logo_url ? true : false}>
        <FormLabel htmlFor="logo-url-input" fontWeight={'normal'}>
          Logo URL
        </FormLabel>
        <Input
          id="logo-url-input"
          type="text"
          placeholder="https://example.com/logo.svg"
          isDisabled={!connected || isDisabled}
          rounded={'full'}
          {...register('logo_url', { required: 'Logo is required' })}
        />
        <FormHelperText>
          URL must end with a supported image extension png, jpg, jpeg or gif
        </FormHelperText>
        <FormErrorMessage>
          {errors.logo_url && errors.logo_url.message}
        </FormErrorMessage>
      </FormControl>

      <Flex mt="3%">
        <FormControl mr="5%" isInvalid={errors.twitter ? true : false}>
          <FormLabel htmlFor="twitter-input" fontWeight={'normal'}>
            Twitter
          </FormLabel>
          <Input
            id="twitter-input"
            placeholder="https://twitter.com/example"
            rounded={'full'}
            isDisabled={!connected || isDisabled}
            {...register('twitter', { required: 'Twitter is required' })}
          />
          <FormErrorMessage>
            {errors.twitter && errors.twitter.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.discord ? true : false}>
          <FormLabel htmlFor="discord-input" fontWeight={'normal'}>
            Discord
          </FormLabel>
          <Input
            id="discord-input"
            placeholder="https://discord.com/sud8dj"
            rounded={'full'}
            isDisabled={!connected || isDisabled}
            {...register('discord', { required: 'Discord is required' })}
          />
          <FormErrorMessage>
            {errors.discord && errors.discord.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl mt="3%" isInvalid={errors.telegram ? true : false}>
        <FormLabel htmlFor="telegram-input" fontWeight={'normal'}>
          Telegram
        </FormLabel>
        <Input
          id="telegram-input"
          type="text"
          placeholder="https://t.me/txf"
          rounded={'full'}
          isDisabled={!connected || isDisabled}
          {...register('telegram', { required: 'Telegram is required' })}
        />
        <FormErrorMessage>
          {errors.telegram && errors.telegram.message}
        </FormErrorMessage>
      </FormControl>
    </>
  )
}
