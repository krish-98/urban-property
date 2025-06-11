import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from '../app/features/user/userSlice'

export default function Header() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showDropdown, SetShowDropdown] = useState<boolean>(false)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((store) => store.user)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  const handleToggle = () => {
    SetShowDropdown((prevDropdown) => !prevDropdown)
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)

    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())

      const res = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/signout`,
        {
          credentials: 'include',
        }
      )
      const data = await res.json()

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return
      }

      dispatch(signOutUserSuccess(data))
    } catch (error) {
      if (error instanceof Error) {
        dispatch(signOutUserFailure(error.message))
      } else {
        console.error('An unexpected error occurred during sign-out', error)
        dispatch(signOutUserFailure('An unexpected error occurred'))
      }
    }
  }

  return (
    <header className="bg-white shadow-md px-4 py-4">
      <nav className="flex justify-between items-center max-w-6xl mx-auto relative">
        <Link to="/">
          <h1 className="font-bold flex flex-wrap space-x-0.5 tracking-tight sm:text-xl xl:text-2xl">
            <span className="text-ubOrange">Urban</span>
            <span className="text-ubBlack">Property</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSearch}
          className="p-1.5 md:p-3 flex items-center gap-1.5 rounded-lg ring-2 ring-mainColor hover:ring-1 hover:ring-ubOrange"
        >
          <input
            type="text"
            placeholder="Search Property"
            className="bg-transparent pl-1 w-24 sm:w-64 font-medium outline-none placeholder:text-[12px] md:placeholder:text-[14px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <ul className="flex items-center gap-4 text-sm font-medium tracking-wide xl:text-base">
          <Link to="/" className="hidden sm:inline">
            <li className="hover:text-slate-600">Home</li>
          </Link>

          <Link to="/about" className="hidden sm:inline">
            <li className="hover:text-slate-600">About</li>
          </Link>

          {currentUser && (
            <Link to="/my-listing" className="hidden sm:inline">
              <li className="hover:text-slate-600">My Listing</li>
            </Link>
          )}

          {currentUser ? (
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleToggle}
              className="rounded-full h-10 w-10 object-cover cursor-pointer"
              src={currentUser?.avatar}
              alt="user-profile"
              referrerPolicy="no-referrer"
            />
          ) : (
            <motion.div
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.85 }}
              transition={{
                duration: 1,
              }}
            >
              <Link to="/sign-in">
                <li className="bg-[#1a1a1a] text-white text-sm px-4 py-1 md:py-1.5 rounded-lg">
                  Sign In
                </li>
              </Link>
            </motion.div>
          )}
        </ul>

        {/* dropdown menu */}
        {showDropdown && (
          <>
            <div
              onClick={() => SetShowDropdown(false)}
              className="fixed inset-0 bg-transparent h-full w-full"
            />
            <div className="flex flex-col bg-[#191919] text-white absolute -right-3 lg:-right-6 top-14 md:top-16 z-50 p-5 rounded-2xl gap-1">
              <Link
                to="/profile"
                onClick={handleToggle}
                className="text-sm lg:text-base tracking-wide pb-1 hover:opacity-70 hover:text-[#fb9242] hover:underline hover:underline-offset-4"
              >
                Profile
              </Link>
              <Link
                to="/create-listing"
                onClick={handleToggle}
                className="text-sm lg:text-base tracking-wide pb-1 hover:opacity-70 hover:text-[#fb9242] hover:underline hover:underline-offset-4"
              >
                Create Listing
              </Link>
              <Link
                to="/my-listing"
                onClick={handleToggle}
                className="text-sm lg:text-base tracking-wide pb-1 hover:opacity-70 hover:text-[#fb9242] hover:underline hover:underline-offset-4 md:hidden"
              >
                My Listing
              </Link>
              <p
                onClick={() => {
                  handleSignOut()
                  handleToggle()
                }}
                className="text-sm lg:text-base tracking-wide cursor-pointer hover:opacity-70 hover:text-[#fb9242] hover:underline hover:underline-offset-4"
              >
                Sign out
              </p>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}
