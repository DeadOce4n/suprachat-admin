import jwtDecode from 'jwt-decode'
import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { login } from '../../services/session'

interface User {
  nick: string
  email: string
  token: string
  isAdmin: boolean
}

interface SessionState {
  isLoggedIn: boolean
  user: User
  error: { error: boolean, message: string }
  login: ({ nick, password }: { nick: string, password: string }) => Promise<void>
  logout: () => void
}

interface Token {
  user: {
    nick: string
    email: string
    admin: boolean
  }
}

export const useSessionStore = create<SessionState>()(
  devtools((set) => ({
    isLoggedIn: false,
    user: { nick: '', email: '', token: '', isAdmin: false },
    error: { error: false, message: '' },
    login: async ({ nick, password }) => {
      try {
        const { token } = await login({ nick, password })
        const { user: { nick: username, email, admin } } = jwtDecode<Token>(token)
        if (!admin) throw new Error('User is not an admin!')
        set(() => ({
          user: {
            token,
            nick: username,
            email,
            isAdmin: admin
          },
          isLoggedIn: true
        }))
      } catch (e: any) {
        set(() => ({ error: { error: true, message: e.message } }))
        throw e
      }
    },
    logout: () => set(() => ({
      isLoggedIn: false,
      user: {
        nick: '',
        email: '',
        token: '',
        isAdmin: false
      }
    }))
  }), { name: 'Session' })
)
