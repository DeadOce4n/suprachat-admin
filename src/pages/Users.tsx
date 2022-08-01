import { useState, useRef, ChangeEvent } from 'react'
import { useUsers } from '../hooks/useUsers'
import {
  Spinner,
  useToast,
  SimpleGrid,
  Center,
  Heading,
  Text,
  VStack,
  Box,
  Button,
  Tag,
  Flex,
  Portal,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormErrorMessage,
  useDisclosure
} from '@chakra-ui/react'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'
import UserCard from '../components/UserCard/UserCard'
import Toolbar from '../components/Toolbar/Toolbar'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSessionStore } from '../hooks/stores/useSessionStore'
import { useUserStore } from '../hooks/stores/useUserStore'

const Users = () => {
  const {
    isLoading,
    users,
    page,
    limit,
    count,
    setPage,
    setLimit,
    error,
    handleFilterChange
  } = useUsers()
  const token = useSessionStore(state => state.user.token)
  const updateUser = useUserStore(state => state.updateUser)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      password: '',
      repeat: ''
    }
  })
  const [selected, setSelected] = useState<{
    nick: string,
    _id: string
  }>({
    _id: '',
    nick: ''
  })

  const password = useRef({})
  password.current = watch('password')
  const passwordsAreEqual = (value: string) => (
    value === password.current || 'Las contraseñas no coinciden.'
  )

  const onSubmit: SubmitHandler<{password: string}> = async (data) => {
    try {
      await updateUser({ _id: selected._id, password: data.password }, token)
      reset()
      onClose()
      setSelected({ nick: '', _id: '' })
      toast({
        title: 'Cambios guardados correctamente',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } catch (e: any) {
      toast({
        title: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  if (error.error) {
    toast({
      title: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true
    })
  }

  const Loading = () => <Center w='full'><Spinner size='xl' /></Center>

  const prevPage = page - 1
  const nextPage = page + 1
  const maxPage = Math.ceil(count.filtered / limit)

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPage(1)
    setLimit(parseInt(event.target.value))
  }

  return (
    <>
      <Box w={{ base: 'full', md: '80%' }} mb='8'>
        <VStack alignItems='start' spacing={4}>
          <VStack w='full' align='start'>
            <Heading as='h1'>Gestionar usuarios</Heading>
            <Tag size='lg' colorScheme='teal'>Total: {count.total}</Tag>
          </VStack>
          <Toolbar
            handleFilterChange={handleFilterChange}
            handleSelectChange={handleSelectChange}
            selectValues={[10, 20, 50, 100]}
            limit={limit}
            placeholder='Buscar usuario...'
          />
          {isLoading
            ? <Loading />
            : <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={4}
              w='full'
            >
              {users.length
                ? users.map(user => (
                  <UserCard
                    key={user._id}
                    user={user}
                    handleVerify={async (_id, verified) => {
                      try {
                        await updateUser({ _id, verified }, token)
                      } catch (e: any) {
                        console.log(e)
                      }
                    }}
                    onOpen={(_id, nick) => {
                      setSelected({ _id, nick })
                      onOpen()
                    }}
                  />
                ))
                : <Heading>Lo sentimos, no hay nada aquí :(</Heading>
              }
            </SimpleGrid>
          }
          <Flex alignSelf='end'>
            <Button
              ml={2}
              mr={1}
              onClick={() => setPage(prevPage)}
              disabled={page === 1}
            >
              <MdArrowBack size={32} />
            </Button>
            <Button
              ml={1}
              mr={2}
              onClick={() => setPage(nextPage)}
              disabled={page === maxPage}
            >
              <MdArrowForward size={32} />
            </Button>
            <Text alignSelf='center'>Página {page} de {maxPage}</Text>
          </Flex>
        </VStack>
      </Box>
      <Portal>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            reset()
            setSelected({ nick: '', _id: '' })
            onClose()
          }}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selected.nick}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form id='passwd-form' onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                  <FormControl>
                    <Input
                      {...register('password', { required: true })}
                      type='password'
                      placeholder='Nueva contraseña'
                    />
                    {errors.password && (<FormErrorMessage>{errors.password.message}</FormErrorMessage>)}
                  </FormControl>
                  <FormControl isInvalid={!!errors.repeat}>
                    <Input
                      {...register('repeat', {
                        required: true,
                        validate: v => passwordsAreEqual(v)
                      })}
                      type='password'
                      placeholder='Repita contraseña'
                    />
                    {errors.repeat && (<FormErrorMessage>{errors.repeat.message}</FormErrorMessage>)}
                  </FormControl>
                </VStack>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                type='submit'
                form='passwd-form'
                colorScheme='teal'
              >
                Guardar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Portal>
    </>
  )
}

export default Users
