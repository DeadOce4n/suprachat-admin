import React from 'react'
import {
  Box,
  Text
} from '@chakra-ui/react'
import { User } from '../../types/interfaces'
import dayjs from 'dayjs'

// about: string
// country: string
// email: string
// nick: string
// password_from: string
// picture: string
// registered_date: string
// admin: boolean

const UserCard = ({ user }: { user: User }) => {
  const {
    nick,
    email,
    password_from: pwFrom,
    registered_date: rgDate
  } = user
  return (
    <Box p={8} bgColor='whiteAlpha.200' borderRadius='lg'>
      <Text fontWeight='semibold' fontSize='xl'>{nick}</Text>
      <Text>{email || 'Sin correo'}</Text>
      <Text>Miembro desde: {dayjs(rgDate).format('DD/MMM/YYYY')}</Text>
      <Text>Se registró desde: {pwFrom === 'supra' ? 'Sistema' : 'Chat'}</Text>
    </Box>
  )
}

export default UserCard
