import React from 'react'
import {
  Flex,
  Text,
  Badge,
  Wrap,
  HStack,
  Button,
  Spacer,
  Tag,
  TagLeftIcon
} from '@chakra-ui/react'
import {
  MdCheckCircle,
  MdCancel,
  MdLock,
  MdMail
} from 'react-icons/md'
import { User } from '../../types/interfaces'
import dayjs from 'dayjs'

interface Props {
  user: User,
  onOpen: (_id: string, nick: string) => void
  handleVerify: (_id: string, verified: boolean) => Promise<void>
}

const UserCard = ({ user, onOpen, handleVerify }: Props) => {
  const {
    _id,
    nick,
    email,
    password_from: pwFrom,
    registered_date: rgDate,
    verified
  } = user

  return (
    <>
      <Flex
        p={8}
        bgColor='whiteAlpha.200'
        borderRadius='lg'
        direction='column'
      >
        <Text
          fontWeight='semibold'
          fontSize='xl'
          mb={2}
        >
          {nick}
        </Text>
        <Text>
          <Tag size='sm'>
            <TagLeftIcon as={MdMail} />
            {email || 'Sin correo'}
          </Tag>
        </Text>
        <Wrap my={2}>
          <Badge colorScheme={verified ? 'green' : 'red'} >
            <HStack spacing={1}>
              <Text>{verified ? <MdCheckCircle /> : <MdCancel />}</Text>
              <Text>{`${verified ? 'V' : 'No v'}erificado`}</Text>
            </HStack>
          </Badge>
          {!email && <Badge colorScheme='yellow'>Sin correo</Badge>}
          <Badge colorScheme={pwFrom === 'supra' ? 'green' : 'red'}>
            Registrado desde {pwFrom === 'supra' ? 'Sistema' : 'Chat'}
          </Badge>
        </Wrap>
        <Text>Miembro desde: {dayjs(rgDate).format('DD/MMM/YYYY')}</Text>
        <Spacer />
        <HStack mt={2}>
          <Button
            leftIcon={<MdLock />}
            onClick={() => onOpen(_id, nick)}
          >
            Cambiar contraseña
          </Button>
          {!verified && (
            <Button
              leftIcon={<MdCheckCircle />}
              onClick={async () => await handleVerify(_id, true)}
            >
              Verificar
            </Button>
          )}
        </HStack>
      </Flex>
    </>
  )
}

export default UserCard
