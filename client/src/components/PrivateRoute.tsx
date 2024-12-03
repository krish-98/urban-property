import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import SuspenseWrapper from './SuspenseWrapper'

export default function PrivateRoute() {
  const { currentUser } = useAppSelector((state) => state.user)

  return currentUser ? (
    <SuspenseWrapper component={<Outlet />} />
  ) : (
    <Navigate to="/sign-in" />
  )
}
