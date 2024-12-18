import { useEffect, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './app/hooks'
import { signOutUserSuccess } from './app/features/user/userSlice'
import { getCookie } from './utils/getCookie'

import Header from './components/Header'
import SuspenseWrapper from './components/SuspenseWrapper'
import Home from './pages/Home'
import Profile from './pages/Profile'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import MyListing from './pages/MyListing'

// Lazy loading
const PrivateRoute = lazy(() => import('./components/PrivateRoute'))
const SignIn = lazy(() => import('./pages/SignIn'))
const SignUp = lazy(() => import('./pages/SignUp'))
const About = lazy(() => import('./pages/About'))
const Search = lazy(() => import('./pages/Search'))
const Listing = lazy(() => import('./pages/Listing'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (!getCookie()) {
      dispatch(signOutUserSuccess())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={
            !currentUser?._id ? (
              <SuspenseWrapper component={<SignIn />} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            !currentUser?._id ? (
              <SuspenseWrapper component={<SignUp />} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/about"
          element={<SuspenseWrapper component={<About />} />}
        />
        <Route
          path="/search"
          element={<SuspenseWrapper component={<Search />} />}
        />
        <Route
          path="/listing/:listingId"
          element={<SuspenseWrapper component={<Listing />} />}
        />
        <Route element={<SuspenseWrapper component={<PrivateRoute />} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/my-listing" element={<MyListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
        <Route
          path="*"
          element={<SuspenseWrapper component={<NotFound />} />}
        />
      </Routes>
    </BrowserRouter>
  )
}
