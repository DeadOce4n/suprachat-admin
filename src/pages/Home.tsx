import React from 'react'
import { SimpleGrid, Heading } from '@chakra-ui/react'
import SectionButton from '../components/SectionButton/SectionButton'
import { FaUserCircle } from 'react-icons/fa'

const Home = () => {
  return (
    <>
      <Heading>Bienvenidx, Gusy</Heading>
      <SimpleGrid
        h='full'
        w={{ base: 'full', md: '80%' }}
        columns={2}
        spacing={2}
        alignItems='start'
        mt={4}
      >
        <SectionButton
          title='Usuarios'
          description='Gestionar usuarios'
          href='/usuarios'
          icon={<FaUserCircle size='70px' />}
        />
      </SimpleGrid>
    </>
  )
}

export default Home
