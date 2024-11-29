import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import SuspenseWrapper from './SuspenseWrapper'
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user)

  return currentUser ? (
    <SuspenseWrapper component={<Outlet />} />
  ) : (
    <Navigate to="/sign-in" />
  )
}
