import { useState, useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { useForm, SubmitHandler } from 'react-hook-form'

import {
  Box,
  Flex,
  Heading,
  Stack,
  Image,
  Button,
  ButtonGroup,
  useToast,
  Progress,
} from '@chakra-ui/react'

import Base from '../components/Base'
import {
  SocialForm,
  TokenInfoForm,
  PresaleRateForm,
} from '../components/Launchpad'

import { useWallet } from '../context'
import { LauncpadInputs } from '../types'
import { addSaleAPI } from '../api'

export default function Launchpad() {
  const { connected, account } = useWallet()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LauncpadInputs>({
    defaultValues: {
      owner: account,
    },
  })

  const {
    trigger,
    isMutating,
    data,
    reset: resetMut,
  } = useSWRMutation('/api/sale', addSaleAPI)

  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)

  const onSubmit: SubmitHandler<LauncpadInputs> = async (data) => {
    // api
    data.owner = account
    trigger(data)
    reset()
  }

  useEffect(() => {
    if (data) {
      console.log('Trigger')
      resetMut()
      toast({
        title: `Sale listed.`,
        position: 'top-right',
        isClosable: true,
      })
    }
  }, [data])

  return (
    <>
      <Base title="Presalano: Launchpad">
        <Stack minH={'70vh'} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
              <Heading fontSize={'2xl'}>Presalano launchpad</Heading>

              <Box
                borderWidth="1px"
                rounded="lg"
                maxWidth={800}
                p={6}
                m="10px auto"
                minH={'550px'}
                as="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Progress
                  value={progress}
                  colorScheme="messenger"
                  rounded={'full'}
                  mb="5%"
                  mx="5%"
                  isAnimated
                ></Progress>
                {step === 1 ? (
                  <TokenInfoForm
                    register={register}
                    errors={errors}
                    isDisabled={isSubmitting || isMutating}
                  />
                ) : step === 2 ? (
                  <PresaleRateForm
                    register={register}
                    errors={errors}
                    isDisabled={isSubmitting || isMutating}
                  />
                ) : (
                  <SocialForm
                    register={register}
                    errors={errors}
                    isDisabled={isSubmitting || isMutating}
                  />
                )}
                <ButtonGroup mt="5%" w="100%">
                  <Flex w="100%" justifyContent="space-between">
                    <Flex>
                      <Button
                        onClick={() => {
                          setStep(step - 1)
                          setProgress(progress - 33.33)
                        }}
                        isDisabled={step === 1 || isMutating}
                        colorScheme="messenger"
                        rounded={'full'}
                        variant="solid"
                        w="7rem"
                        mr="5%"
                      >
                        Back
                      </Button>
                      <Button
                        w="7rem"
                        isDisabled={step === 3 || isMutating}
                        rounded={'full'}
                        onClick={() => {
                          setStep(step + 1)
                          if (step === 3) {
                            setProgress(100)
                          } else {
                            setProgress(progress + 33.33)
                          }
                        }}
                        colorScheme="messenger"
                        variant="outline"
                      >
                        Next
                      </Button>
                    </Flex>
                    {step === 3 ? (
                      <Button
                        w="7rem"
                        colorScheme="green"
                        variant="solid"
                        isDisabled={!connected}
                        isLoading={isSubmitting || isMutating}
                        rounded={'full'}
                        type="submit"
                      >
                        Submit
                      </Button>
                    ) : null}
                  </Flex>
                </ButtonGroup>
              </Box>
            </Stack>
          </Flex>

          <Flex flex={1}>
            <Box
              position={'relative'}
              rounded={'2xl'}
              width={'full'}
              overflow={'hidden'}
            >
              <Image
                alt={'Login Image'}
                src={'/banner.svg'}
                w={'100%'}
                h={'100%'}
              />
            </Box>
          </Flex>
        </Stack>
      </Base>
    </>
  )
}
