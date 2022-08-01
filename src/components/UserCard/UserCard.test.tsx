import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { it, expect, describe, beforeEach, afterEach, vi } from 'vitest'
import UserCard from './UserCard'

const baseUser = {
  _id: '620dde6852ab3429a52ec187',
  nick: 'DeadOcean',
  email: 'pedro@ivanpartida.xyz',
  registered_date: '2021-05-03T07:52:25',
  password_from: 'supra',
  admin: true,
  verified: true
}

const mockVerifyHandler = vi.fn()
const mockOnOpenHandler = vi.fn()

const onOpen = () => null
const handleVerify = () => Promise.resolve()

describe('User card', () => {
  afterEach(cleanup)

  it('renders correctly', () => {
    const user = baseUser
    const component = render(
      <UserCard user={user} onOpen={onOpen} handleVerify={handleVerify} />
    )
    expect(component).toBeDefined()
    component.getByText(/sistema/i)
  })

  it('renders verify button when not verified', () => {
    const user = { ...baseUser, verified: false }
    const component = render(
      <UserCard user={user} onOpen={onOpen} handleVerify={handleVerify} />
    )
    component.getByText('Verificar')
  })

  it('does not render verify button when not verified', () => {
    const user = { ...baseUser }
    const component = render(
      <UserCard user={user} onOpen={onOpen} handleVerify={handleVerify} />
    )
    expect(component.queryByText('Verificar')).toBeNull()
  })

  it('opens form when clicking on button', () => {
    const user = { ...baseUser }
    const component = render(
      <UserCard user={user} onOpen={mockOnOpenHandler} handleVerify={handleVerify} />
    )
    const button = component.getByText('Cambiar contraseña')
    fireEvent.click(button)
    expect(mockOnOpenHandler).toHaveBeenCalledOnce()
  })

  it('shows the right thing when user does not have email', () => {
    const { email: _, ...rest } = baseUser
    const user = rest

    const component = render(
      <UserCard user={user} onOpen={() => null} handleVerify={handleVerify} />
    )
    expect(component.getAllByText('Sin correo')).toHaveLength(2)
  })

  it('shows the right thing when user\'s password comes from the IRCd', () => {
    const user = { ...baseUser, password_from: 'ergo' }
    const component = render(
      <UserCard user={user} onOpen={() => null} handleVerify={handleVerify} />
    )

    component.getByText(/chat/i)
  })

  it('calls function when clicking on verify button', () => {
    const user = { ...baseUser, verified: false }
    const component = render(
      <UserCard user={user} onOpen={() => null} handleVerify={mockVerifyHandler} />
    )
    const button = component.getByText('Verificar')
    fireEvent.click(button)
    expect(mockVerifyHandler).toHaveBeenCalledOnce()
  })
})
