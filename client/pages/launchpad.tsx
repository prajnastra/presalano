import { useState } from 'react'
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

export default function Launchpad() {
  const { connected } = useWallet()
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)
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
                minH={'500px'}
                as="form"
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
                  <TokenInfoForm />
                ) : step === 2 ? (
                  <PresaleRateForm />
                ) : (
                  <SocialForm />
                )}
                <ButtonGroup mt="5%" w="100%">
                  <Flex w="100%" justifyContent="space-between">
                    <Flex>
                      <Button
                        onClick={() => {
                          setStep(step - 1)
                          setProgress(progress - 33.33)
                        }}
                        isDisabled={step === 1}
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
                        isDisabled={step === 3}
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
                        rounded={'full'}
                        onClick={() => {
                          toast({
                            title: 'Account created.',
                            description: "We've created your account for you.",
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                          })
                        }}
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
