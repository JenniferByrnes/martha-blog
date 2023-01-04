import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
// import Spinner from './Spinner'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  // is we are not done checkingStatus, show loading, else show result
  if (checkingStatus) {
    return <h3>Loading...</h3>
  }
// Navigate is a redirect
// Outlet allows us to render child elements - located in app.js as nested route.
  return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute