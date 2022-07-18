import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import {
  Flex,
  Button,
  HStack,
  chakra,
  Image,
  Spacer
} from '@chakra-ui/react'
import { Page } from '../../types/interfaces'
import { useSessionStore } from '../../hooks/stores/useSessionStore'
import logo from '../../assets/img/logo.png'

const Layout = ({ pages }: { pages: Array<Page> }) => {
  const navigate = useNavigate()
  const logout = useSessionStore(state => state.logout)

  return (
    <div style={{ height: '100vh', overflowY: 'scroll' }}>
      <HStack w='full' h='full'>
        <Flex
          h='full'
          w='30ch'
          p={4}
          direction='column'
          bgColor='gray.800'
        >
          <Image mb={2} borderRadius='lg' src={logo} />
          {pages && pages.map(page => (
            <Button
              colorScheme='teal'
              key={page.title}
              my={2}
              w='full'
              onClick={() => navigate(page.href)}
            >
              {page.title}
            </Button>
          ))}
          <Spacer />
          <Button
            w='full'
            my={2}
            colorScheme='orange'
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
          >
            Cerrar sesión
          </Button>
        </Flex>
        <chakra.main w='full' h='full' px={8} py={4}><Outlet /></chakra.main>
      </HStack>
    </div>
  )
}

export default Layout
