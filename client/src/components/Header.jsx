import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaSearch } from 'react-icons/fa'

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { currentUser } = useSelector((store) => store.user)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  const handleSubmit = (e) => {
    e.preventDefault()

    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  return (
    <header className="bg-white shadow-md px-4 py-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap space-x-0.5">
            <span className="text-[#fb923c]">Urban</span>
            <span className="text-[#191919]">Property</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="ring-[#fff7f2] ring-2 p-1.5 md:p-3 rounded-lg flex items-center gap-1.5 "
        >
          <button>
            <FaSearch className="text-slate-600" />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none pl-1 w-24 sm:w-64 font-medium placeholder:font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <ul className="flex gap-4 items-center">
          <Link to="/" className="hidden sm:inline">
            <li className="font-medium hover:text-slate-600">Home</li>
          </Link>

          <Link to="/about" className="hidden sm:inline">
            <li className="font-medium hover:text-slate-600">About</li>
          </Link>

          <Link to="/listings" className="hidden sm:inline">
            <li className="font-medium hover:text-slate-600">Listing</li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-10 w-10 object-cover"
                src={currentUser?.avatar}
                alt="user-profile"
                referrerPolicy="no-referrer"
              />
            ) : (
              <li className="bg-[#1a1a1a] text-white px-3 py-1.5 rounded-lg transition-all hover:bg-opacity-80">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  )
}
