import React from 'react'
import {
  Flex,
  Spacer,
  IconButton
} from '@chakra-ui/react'
import { IoMdArrowRoundBack, IoMdMenu } from 'react-icons/io'

interface Props {
  handleToggle: () => void
  handleGoBack: () => void
}

const Topbar = ({ handleToggle, handleGoBack }: Props) => {
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
      />
      <Spacer />
    </Flex>
  )
}

export default Topbar
