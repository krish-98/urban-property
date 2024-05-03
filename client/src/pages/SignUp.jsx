import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [e.target.id]: e.target.value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (data.success === false) {
        setIsLoading(false)
        setError('Email Id already exist')
        setTimeout(() => setError(null), 5000)
        return
      }
      setIsLoading(false)
      setError(null)
      navigate('/sign-in')
      console.log(data)
    } catch (error) {
      setIsLoading(false)
      setError(`Something went wrong, Try again after sometime`)
    }
  }

  return (
    <div className="flex h-[calc(100vh-60px)] md:h-[calc(100vh-72px)] justify-center items-center">
      <div className="px-6 bg-white w-80 md:w-96 h-[475px] rounded-xl">
        <h1 className="text-lg md:text-3xl text-center font-semibold my-4">
          Sign Up
        </h1>
        {error ? (
          <p className="text-sm md:text-base text-red-600 font-medium text-center py-2 md:py-4">
            {error}
          </p>
        ) : (
          ''
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            id="username"
            required
            className="border p-3 pl-4 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="username@email.com"
            id="email"
            required
            className="border p-3 pl-4 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="********"
            id="password"
            required
            className="border p-3 pl-4 rounded-lg"
            onChange={handleChange}
          />
          <button
            disabled={isLoading}
            type="submit"
            className="bg-black text-sm md:text-base text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70"
          >
            {isLoading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth />
        </form>

        <div className="flex gap-2 mt-5 text-sm md:text-base">
          <p>Already have an account?</p>
          <Link to={'/sign-in'}>
            <span className="font-medium hover:underline">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
