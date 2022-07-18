import { encode } from 'js-base64'
const API_URL = import.meta.env.VITE_API_URL

interface Response {
  token: string
}

export const login = async ({
  nick,
  password
}: {
  nick: string,
  password: string
}): Promise<Response> => {
  const auth = encode(`${nick}:${password}`)
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`
    },
    body: JSON.stringify({ rememberMe: false })
  })
  if (!res.ok) throw new Error('Error al iniciar sesión')
  const data: Response = await res.json()
  return data
}
