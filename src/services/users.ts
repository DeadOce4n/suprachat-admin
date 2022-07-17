import { User } from '../types/interfaces'
import qs from 'qs'

const API_URL = import.meta.env.VITE_API_URL

interface Response {
  users: Array<User>
  count: {
    total: number
    actual: number
    filtered: number
  }
}

export const findUsers = async ({
  filter,
  page,
  limit
}: {
  filter: string
  page: number
  limit: number
}): Promise<Response> => {
  const q = qs.stringify({ filter, page, limit })
  const res = await fetch(`${API_URL}/users?${q}`)
  if (!res.ok) throw new Error('Error de conexión, intente más tarde')
  const data: Response = await res.json()
  return data
}
