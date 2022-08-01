import { ReactElement } from 'react'
import { useSessionStore } from '../../hooks/stores/useSessionStore'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { isLoggedIn, isAdmin } = useSessionStore(
    state => ({ isLoggedIn: state.isLoggedIn, isAdmin: state.user.isAdmin })
  )

  if (!isLoggedIn || !isAdmin) return <Navigate to='/login' replace />
  return children
}

export default PrivateRoute
