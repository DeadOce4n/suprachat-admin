import { Outlet, useNavigate } from 'react-router-dom'
import {
  HStack,
  VStack,
  chakra,
  Box,
  Flex,
  Text,
  useDisclosure,
  useBreakpointValue
} from '@chakra-ui/react'
import { Page } from '../../types/interfaces'
import { useSessionStore } from '../../hooks/stores/useSessionStore'
import Menu, { Drawer } from './Menu'
import Topbar from './Topbar'

const Layout = ({ pages }: { pages: Array<Page> }) => {
  const logout = useSessionStore(state => state.logout)
  const { isOpen, onToggle, onClose } = useDisclosure()
  const isAnchored = useBreakpointValue({ base: false, md: true })
  const navigate = useNavigate()

  return (
    <chakra.div
      h={{ base: '100%', md: '100vh' }}
      w='100%'
      position='fixed'
      overflowY='hidden'
    >
      <HStack
        w='full'
        h='full'
        spacing={0}
      >
        {isAnchored
          ? (
            <VStack
              h='full'
              w={isOpen ? '25ch' : '8ch'}
              bgColor='gray.700'
              display={{ base: 'none', md: 'initial' }}
              position='sticky'
              top={0}
              left={0}
            >
              <Menu
                pages={pages}
                isOpen={isOpen}
                logout={logout}
                onToggle={onToggle}
                navigate={navigate}
              />
            </VStack>)
          : (
            <Drawer
              isOpen={isOpen}
              onClose={onClose}
              header='Menú'
              pages={pages}
              navigate={navigate}
              onToggle={onToggle}
              logout={logout}
            />
            )}
        <Flex
          w='full'
          h='full'
          direction='column'
        >
          <Topbar
            handleToggle={onToggle}
            handleGoBack={() => navigate(-1)}
          />
          <chakra.main
            w='full'
            px={{ base: 4, md: 16 }}
            py={{ base: 4, md: 8 }}
            overflowY='scroll'
            flex={1}
          >
            <Outlet />
            <Box w='full' px={20} py={10}>
              <Text align='center'>2022 SupraChat AdminPanel</Text>
              <Text align='center'>Made by DeadOcean</Text>
            </Box>
          </chakra.main>
        </Flex>
      </HStack>
    </chakra.div>
  )
}

export default Layout
