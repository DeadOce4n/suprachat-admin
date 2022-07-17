import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { Box, Button, HStack, chakra, Image } from '@chakra-ui/react'
import { Page } from '../../types/interfaces'
import logo from '../../assets/img/logo.png'

const Layout = ({
  children,
  pages
}: {
  children: ReactElement
  pages: Array<Page>
}) => {
  const navigate = useNavigate()
  return (
    <div style={{ height: '100vh', overflowY: 'scroll' }}>
      <HStack w='full' h='full'>
        <Box
          h='100vh'
          w='30ch'
          bgColor='gray.800'
          p={4}
        >
          <Image mb={2} borderRadius='lg' src={logo} />
          {pages && pages.map(page => (
            <Button
              key={page.title}
              my={2}
              w='full'
              onClick={() => navigate(page.href)}
            >
              {page.title}
            </Button>
          ))}
        </Box>
        <chakra.main w='full' h='full' px={8} py={4}>{children}</chakra.main>
      </HStack>
    </div>
  )
}

export default Layout
