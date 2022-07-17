import React from 'react'
import {
  Box,
  Text,
  Heading,
  Flex,
  Center,
  Spacer
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import type { ReactElement } from 'react'

interface Props {
  title: string
  description: string
  href: string
  icon: ReactElement
}

const SectionButton = ({
  title,
  description,
  href,
  icon
}: Props) => {
  const navigate = useNavigate()
  return (
    <Box
      as='button'
      onClick={() => navigate(href)}
      bgColor='whiteAlpha.200'
      w='full'
      borderRadius='lg'
      p={8}
    >
      <Flex dir='row'>
        <Box>
          <Heading textAlign='left'>{title}</Heading>
          <Text textAlign='left'>{description}</Text>
        </Box>
        <Spacer />
        <Center>
          {React.cloneElement(icon)}
        </Center>
      </Flex>
    </Box>
  )
}

export default SectionButton
