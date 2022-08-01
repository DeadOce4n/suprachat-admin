import {
  Flex,
  Spacer,
  IconButton
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { IoMdArrowRoundBack, IoMdMenu } from 'react-icons/io'

interface Props {
  handleToggle: () => void
  handleGoBack: () => void
}

const Topbar = ({ handleToggle, handleGoBack }: Props) => {
  const location = useLocation()
  return (
    <Flex
      py={4}
      px={{ base: 4, md: 16 }}
      bgColor='yellow.200'
    >
      <IconButton
        aria-label='Open/close menu'
        icon={<IoMdMenu />}
        variant='link'
        fontSize='xl'
        onClick={handleToggle}
        color='black'
      />
      <IconButton
        aria-label='Go back'
        icon={<IoMdArrowRoundBack />}
        variant='link'
        fontSize='xl'
        onClick={handleGoBack}
        color='black'
        disabled={location.pathname === '/'}
      />
      <Spacer />
    </Flex>
  )
}

export default Topbar
