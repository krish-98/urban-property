import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from '../features/user/userSlice'

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, SetShowDropdown] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((store) => store.user)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  const handleToggle = () => {
    SetShowDropdown((prevDropdown) => !prevDropdown)
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json()
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return
      }

      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  return (
    <header className="bg-white shadow-md px-4 py-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto relative">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap space-x-0.5">
            <span className="text-[#fb923c]">Urban</span>
            <span className="text-[#191919]">Property</span>
          </h1>
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="ring-mainColor ring-2 p-1.5 md:p-3 rounded-lg flex items-center gap-1.5"
        >
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none pl-1 w-24 sm:w-64 font-medium placeholder:font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <ul className="flex gap-4 items-center">
          <Link to="/" className="hidden sm:inline">
            <li className="font-medium hover:text-slate-600">Home</li>
          </Link>

          <Link to="/about" className="hidden sm:inline">
            <li className="font-medium hover:text-slate-600">About</li>
          </Link>

          {currentUser && (
            <Link to="/my-listing" className="hidden sm:inline">
              <li className="font-medium hover:text-slate-600">My Listing</li>
            </Link>
          )}

          {currentUser ? (
            <img
              onClick={handleToggle}
              className="rounded-full h-10 w-10 object-cover cursor-pointer"
              src={currentUser?.avatar}
              alt="user-profile"
              referrerPolicy="no-referrer"
            />
          ) : (
            <Link to="/sign-in">
              <li className="bg-[#1a1a1a] text-white px-3 py-1.5 rounded-lg transition-all hover:bg-opacity-80">
                Sign In
              </li>
            </Link>
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
                className="text-sm lg:text-base lg:font-medium tracking-wide pb-1 hover:opacity-70 hover:text-[#fb9242] hover:underline hover:underline-offset-4"
              >
                Profile
              </Link>
              <Link
                to="/create-listing"
                onClick={handleToggle}
                className="text-sm lg:text-base lg:font-medium tracking-wide pb-1 hover:opacity-70 hover:text-[#fb9242] hover:underline hover:underline-offset-4"
              >
                Create Listing
              </Link>
              <Link
                to="/my-listing"
                onClick={handleToggle}
                className="text-sm lg:text-base lg:font-medium tracking-wide pb-1 hover:opacity-70 hover:text-[#fb9242] hover:underline hover:underline-offset-4 md:hidden"
              >
                My Listing
              </Link>
              <p
                onClick={() => {
                  handleSignOut()
                  handleToggle()
                }}
                className="text-sm lg:text-base lg:font-medium tracking-wide cursor-pointer hover:opacity-70 hover:text-[#fb9242] hover:underline hover:underline-offset-4"
              >
                Sign out
              </p>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
