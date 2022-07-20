import {
  User,
  UsersResponse,
  IUpdateUser
} from '../types/interfaces'
import qs from 'qs'

const API_URL = import.meta.env.VITE_API_URL

export const findUsers = async ({
  filter,
  page,
  limit
}: {
  filter: string
  page: number
  limit: number
}): Promise<UsersResponse> => {
  const q = qs.stringify({ filter, page, limit })
  const res = await fetch(`${API_URL}/users?${q}`)
  if (!res.ok) throw new Error('Error de conexión, intente más tarde')
  const data: UsersResponse = await res.json()
  return data
}

export const updateUser = async (data: IUpdateUser, token: string): Promise<User> => {
  const { _id, ...payload } = data
  console.log(payload)
  const res = await fetch(`${API_URL}/users/${_id}`, {
    method: 'PUT',
    headers: {
      'X-Access-Tokens': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Error de conexión, intente más tarde')
  const user: User = await res.json()
  return user
}
