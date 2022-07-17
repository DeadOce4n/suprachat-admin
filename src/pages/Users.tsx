import React from 'react'
import { useUsers } from '../hooks/useUsers'
import {
  Spinner,
  useToast,
  SimpleGrid,
  Center,
  Heading,
  Text,
  Input,
  VStack,
  HStack,
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  Select,
  Tag,
  Flex
} from '@chakra-ui/react'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'
import { TbNumbers } from 'react-icons/tb'
import UserCard from '../components/UserCard/UserCard'

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

  return (
      <Box w={{ base: 'full', md: '80%' }} mb='8'>
        <VStack alignItems='start' spacing={4}>
          <VStack w='full' align='start'>
            <Heading as='h1'>Gestionar usuarios</Heading><Tag>Total: {count.total}</Tag>
          </VStack>
          <HStack alignSelf='end' w='full'>
            <Input
              placeholder='Buscar usuario'
              onChange={handleFilterChange}
            />
            <Popover>
              <PopoverTrigger>
                <Button><TbNumbers size={28} /></Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverCloseButton />
                <PopoverHeader>¿Cuántos resultados quieres que se muestren?</PopoverHeader>
                <PopoverBody>
                  <Select
                    defaultValue={20}
                    onChange={(event) => setLimit(parseInt(event.target.value))}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </Select>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
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
