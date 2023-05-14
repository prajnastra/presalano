import { UseFormRegister, FieldErrors } from 'react-hook-form'

import {
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react'

import { useWallet } from '../../context'
import { LauncpadInputs } from '../../types'

interface Props {
  register: UseFormRegister<LauncpadInputs>
  errors: FieldErrors<LauncpadInputs>
  isDisabled: boolean
}

export default function TokenInfoForm({ register, errors, isDisabled }: Props) {
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
        Token Info
      </Heading>

      <Flex>
        <FormControl mr="5%" isInvalid={errors.token_name ? true : false}>
          <FormLabel htmlFor="token-name-input" fontWeight={'normal'}>
            Token Name
          </FormLabel>
          <Input
            id="token-name-input"
            placeholder="Token name"
            type="text"
            rounded={'full'}
            isDisabled={!connected || isDisabled}
            {...register('token_name', { required: 'Token name is required' })}
          />
          <FormErrorMessage>
            {errors.token_name && errors.token_name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.total_supply ? true : false}>
          <FormLabel htmlFor="total-supply-input" fontWeight={'normal'}>
            Total Supply
          </FormLabel>
          <Input
            id="total-supply-input"
            placeholder="0"
            type="number"
            rounded={'full'}
            isDisabled={!connected || isDisabled}
            {...register('total_supply', { required: 'Supply is required' })}
          />
          <FormErrorMessage>
            {errors.total_supply && errors.total_supply.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl mt="3%" isInvalid={errors.token_name ? true : false}>
        <FormLabel htmlFor="policy-id-input" fontWeight={'normal'}>
          Policy Id
        </FormLabel>
        <Input
          id="policy-id-input"
          type="text"
          rounded={'full'}
          placeholder="d343aa89662da4d1367268a573660b57ef6c62ff235f51d035f43531"
          isDisabled={!connected || isDisabled}
          {...register('policy_id', { required: 'Policy id is required' })}
        />
        <FormHelperText>Put your native token policy id</FormHelperText>
        <FormErrorMessage>
          {errors.policy_id && errors.policy_id.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt="3%" isInvalid={errors.description ? true : false}>
        <FormLabel htmlFor="description-input" fontWeight={'normal'}>
          Description
        </FormLabel>
        <Textarea
          id="policy-id-input"
          rounded={'lg'}
          placeholder="..."
          isDisabled={!connected || isDisabled}
          {...register('description', { required: 'Description is required' })}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
        <FormHelperText>
          Don&apos;t put more than 100 characters.
        </FormHelperText>
      </FormControl>
    </>
  )
}
