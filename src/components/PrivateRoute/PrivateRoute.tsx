import React, { ReactElement } from 'react'
import { useSessionStore } from '../../hooks/stores/useSessionStore'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const isLoggedIn = useSessionStore(state => state.isLoggedIn)

  if (!isLoggedIn) return <Navigate to='/login' replace />
  return children
}

export default PrivateRoute
