import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { User, IUpdateUser } from '../../types/interfaces'
import { updateUser } from '../../services/users'

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
  updateUser: (data: IUpdateUser, token: string) => Promise<void>
}

export const useUserStore = create<UserState>()(
  devtools((set, get) => ({
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
    setCount: ({ total, actual, filtered }) => (set(() => ({ count: { total, actual, filtered } }))),
    updateUser: async (data: IUpdateUser, token: string) => {
      const user = await updateUser(data, token)
      const users = [...get().users]
      users[users.findIndex(u => u.nick === user.nick)] = user
      set(() => ({ users }))
    }
  }))
)
