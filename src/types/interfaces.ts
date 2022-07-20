import type { ReactElement } from 'react'

export interface User {
  _id: string
  nick: string
  admin: boolean
  verified: boolean
  email?: string
  password_from: string
  about?: string
  country?: string
  picture?: string
  registered_date?: string
}

export interface UsersResponse {
  users: Array<User>
  count: {
    total: number
    actual: number
    filtered: number
  }
}

export interface IUpdateUser {
  _id: string
  password?: string
  verified?: boolean
  about?: string
  country?: string
}

export interface Page {
  title: string
  href: string
  element: ReactElement
}
