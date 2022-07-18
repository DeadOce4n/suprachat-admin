import React, { ChangeEvent } from 'react'
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
  Flex
} from '@chakra-ui/react'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'
import UserCard from '../components/UserCard/UserCard'
import Toolbar from '../components/Toolbar/Toolbar'

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
  const toast = useToast()

  if (error.error) {
    toast({
      title: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true
    })
  }

  const Loading = () => <Center h='full' w='full'><Spinner size='xl' /></Center>

  const prevPage = page - 1
  const nextPage = page + 1
  const maxPage = Math.ceil(count.filtered / limit)

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPage(1)
    setLimit(parseInt(event.target.value))
  }

  return (
      <Box w={{ base: 'full', md: '80%' }} mb='8'>
        <VStack alignItems='start' spacing={4}>
          <VStack w='full' align='start'>
            <Heading as='h1'>Gestionar usuarios</Heading><Tag>Total: {count.total}</Tag>
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
                ? users.map(user => <UserCard key={user._id} user={user} />)
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
  )
}

export default Users
