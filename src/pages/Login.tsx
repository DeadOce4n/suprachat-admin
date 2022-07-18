import React, { useEffect } from 'react'
import {
  Flex,
  Heading,
  FormControl,
  Input,
  Button,
  useToast
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSessionStore } from '../hooks/stores/useSessionStore'
import {useNavigate} from 'react-router-dom'

type Values = {
  nick: string
  password: string
}

const Login = () => {
  const { register, handleSubmit } = useForm<Values>({
    defaultValues: {
      nick: '',
      password: ''
    }
  })
  const { login, error } = useSessionStore(state => state)
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (error.error) {
      toast({
        title: error.message,
        status: error.error ? 'error' : 'success',
        duration: 5000,
        isClosable: true
      })
    }
  }, [error])

  const onSubmit: SubmitHandler<Values> = async (data) => {
    try {
      await login(data)
      navigate('/', { replace: true })
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <Flex h='100vh' align='center' justify='center'>
      <Flex p={12} direction='column' background='gray.700' rounded={6}>
        <Heading pb={6}>Iniciar sesión</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Input
              {...register('nick', { required: true })}
              placeholder='Nick'
              variant='filled'
              mb={2}
            />
          </FormControl>
          <FormControl>
            <Input
              {...register('password', { required: true })}
              placeholder='Contraseña'
              type='password'
              variant='filled'
              mb={6}
            />
          </FormControl>
          <Button w='full' colorScheme='teal' type='submit'>Iniciar sesión</Button>
        </form>
      </Flex>
    </Flex>
  )
}

export default Login
