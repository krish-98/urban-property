import { lazy, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header'
import Home from './pages/Home'
import SuspenseWrapper from './components/SuspenseWrapper'
import Profile from './pages/Profile'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import MyListing from './pages/MyListing'
import { getCookie } from './utils/getCookie'
import { signOutUserSuccess } from './app/features/user/userSlice'

const PrivateRoute = lazy(() => import('./components/PrivateRoute'))
const SignIn = lazy(() => import('./pages/SignIn'))
const SignUp = lazy(() => import('./pages/SignUp'))
const About = lazy(() => import('./pages/About'))
const Search = lazy(() => import('./pages/Search'))
const Listing = lazy(() => import('./pages/Listing'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    if (!getCookie()) {
      dispatch(signOutUserSuccess())
    }
  }, [])

  return (
    <Router>
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
    </Router>
  )
}
