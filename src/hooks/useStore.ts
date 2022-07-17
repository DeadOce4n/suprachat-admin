import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { User } from '../types/interfaces'

interface UserState {
  isLoading: boolean
  users: Array<User>
  page: number
  limit: number
  count: {
    actual: number
    total: number
    filtered: number
  }
  setIsLoading: (isLoading: boolean) => void
  setUsers: (users: Array<User>) => void
  addUser: (user: User) => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setCount: (count: { total: number, actual: number, filtered: number }) => void
}

export const useStore = create<UserState>()(
  devtools((set) => ({
    isLoading: false,
    users: [],
    page: 1,
    limit: 20,
    count: {
      actual: 0,
      total: 0,
      filtered: 0
    },
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
    setUsers: (users) => set(() => ({ users })),
    addUser: (user) => set(state => ({ users: state.users.concat(user) })),
    setPage: (page) => set(() => ({ page })),
    setLimit: (limit) => set(() => ({ limit })),
    setCount: ({ total, actual, filtered }) => (set(() => ({ count: { total, actual, filtered } })))
  }))
)
