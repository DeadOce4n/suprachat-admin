import type { ReactElement } from 'react'

export interface User {
  _id: string
  about: string
  country: string
  email: string
  nick: string
  password_from: string
  picture: string
  registered_date: string
  admin: boolean
  verified: boolean
}

export interface Page {
  title: string
  href: string
  element: ReactElement
}
