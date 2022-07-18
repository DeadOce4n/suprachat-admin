import React from 'react'
import {
  Box,
  Text,
  Badge,
  Wrap
} from '@chakra-ui/react'
import { User } from '../../types/interfaces'
import dayjs from 'dayjs'

const UserCard = ({ user }: { user: User }) => {
  const {
    nick,
    email,
    password_from: pwFrom,
    registered_date: rgDate,
    verified
  } = user
  return (
    <Box p={8} bgColor='whiteAlpha.200' borderRadius='lg'>
      <Text fontWeight='semibold' fontSize='xl'>{nick}</Text>
      {email && <Text fontSize='sm'>{email}</Text>}
      <Wrap my={2}>
        <Badge colorScheme={verified ? 'green' : 'red'} >
            {`${verified ? 'V' : 'No v'}erificado`}
        </Badge>
        {!email && <Badge colorScheme='yellow'>Sin correo</Badge>}
        <Badge colorScheme={pwFrom === 'supra' ? 'green' : 'red'}>
          Registrado desde {pwFrom === 'supra' ? 'Sistema' : 'Chat'}
        </Badge>
      </Wrap>
      <Text>Miembro desde: {dayjs(rgDate).format('DD/MMM/YYYY')}</Text>
    </Box>
  )
}

export default UserCard
