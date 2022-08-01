import {
  Flex,
  Button,
  Spacer,
  Text,
  Image,
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from '@chakra-ui/react'
import { NavigateFunction } from 'react-router-dom'
import { FaDoorOpen } from 'react-icons/fa'
import { Page } from '../../types/interfaces'
import logo from '../../assets/img/logo.png'

interface MenuProps {
  pages: Array<Page>
  isOpen: boolean
  logout: () => void
  onToggle: () => void
  navigate: NavigateFunction
}

const Menu = ({
  pages,
  isOpen,
  onToggle,
  logout,
  navigate
}: MenuProps) => {
  return (
    <Flex
      h='full'
      w={isOpen ? '25ch' : '8ch'}
      px={4}
      pb={4}
      direction='column'
      bgColor='gray.700'
    >
      <Flex direction='row' mb={2}>
        {isOpen && (
          <Image
            borderRadius='lg'
            src={logo}
            objectFit='contain'
            mt={4}
          />
        )}
      </Flex>
      {pages && pages.map(page => (
        <Button
          key={page.title}
          my={2}
          w='full'
          onClick={() => {
            navigate(page.href)
            isOpen && onToggle()
          }}
        >
          {page.icon}
          {isOpen && <Text w='full' textAlign='center'>{page.title}</Text>}
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
        <FaDoorOpen />
        {isOpen && <Text w='full' textAlign='center'>Cerrar sesión</Text>}
      </Button>
    </Flex>
  )
}

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
  navigate: NavigateFunction
  header: string
  pages: Array<Page>
  logout: () => void
}

export const Drawer = ({
  isOpen,
  onClose,
  onToggle,
  navigate,
  header,
  pages,
  logout
}: DrawerProps) => {
  return (
    <ChakraDrawer
      isOpen={isOpen}
      placement='left'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{header}</DrawerHeader>
        <DrawerBody>
          {pages && pages.map(page => (
            <Button
              key={page.title}
              my={2}
              w='full'
              onClick={() => {
                navigate(page.href)
                isOpen && onToggle()
              }}
            >
              {page.icon}
              <Text w='full' textAlign='center'>{page.title}</Text>
            </Button>
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Button
            w='full'
            my={2}
            colorScheme='orange'
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
          >
            <FaDoorOpen />
            <Text w='full' textAlign='center'>Cerrar sesión</Text>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  )
}

export default Menu
