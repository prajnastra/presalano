import { UseFormRegister, FieldErrors } from 'react-hook-form'

import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/react'

import { useWallet } from '../../context'
import { LauncpadInputs } from '../../types'

interface Props {
  register: UseFormRegister<LauncpadInputs>
  errors: FieldErrors<LauncpadInputs>
  isDisabled: boolean
}

export default function PresaleRateForm({
  register,
  errors,
  isDisabled,
}: Props) {
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
        Presale Info
      </Heading>

      <FormControl mt="3%" isInvalid={errors.token_per_ada ? true : false}>
        <FormLabel htmlFor="token-per-ada-input" fontWeight={'normal'}>
          Token Per Ada
        </FormLabel>
        <Input
          id="token-per-ada-input"
          type="number"
          rounded={'full'}
          placeholder="0"
          isDisabled={!connected || isDisabled}
          {...register('token_per_ada', { required: 'Token per ada required' })}
        />
        <FormErrorMessage>
          {errors.token_per_ada && errors.token_per_ada.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt="3%" isInvalid={errors.min_buy ? true : false}>
        <FormLabel htmlFor="min-ada-input" fontWeight={'normal'}>
          Min Buy (Ada)
        </FormLabel>
        <Input
          id="min-ada-input"
          type="number"
          rounded={'full'}
          placeholder="0"
          isDisabled={!connected || isDisabled}
          {...register('min_buy', { required: 'Min buy is required' })}
        />
        <FormErrorMessage>
          {errors.min_buy && errors.min_buy.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt="3%" isInvalid={errors.max_buy ? true : false}>
        <FormLabel htmlFor="max-buy-input" fontWeight={'normal'}>
          Max Buy (Ada)
        </FormLabel>
        <Input
          id="max-buy-input"
          type="number"
          rounded={'full'}
          placeholder="0"
          isDisabled={!connected || isDisabled}
          {...register('max_buy', { required: 'Max buy is required' })}
        />
        <FormErrorMessage>
          {errors.max_buy && errors.max_buy.message}
        </FormErrorMessage>
      </FormControl>

      <Flex mt="3%">
        <FormControl mr="5%" isInvalid={errors.start_time ? true : false}>
          <FormLabel htmlFor="start-time-input" fontWeight={'normal'}>
            Start Time
          </FormLabel>
          <Input
            id="start-time-input"
            type="number"
            rounded={'full'}
            placeholder="0"
            isDisabled={!connected || isDisabled}
            {...register('start_time', { required: 'Start time is required' })}
          />
          <FormErrorMessage>
            {errors.start_time && errors.start_time.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.end_time ? true : false}>
          <FormLabel htmlFor="end-time-input" fontWeight={'normal'}>
            End Time
          </FormLabel>
          <Input
            id="end-time-input"
            type="number"
            rounded={'full'}
            placeholder="0"
            isDisabled={!connected || isDisabled}
            {...register('end_time', { required: 'End time is required' })}
          />
          <FormErrorMessage>
            {errors.end_time && errors.end_time.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>
    </>
  )
}
