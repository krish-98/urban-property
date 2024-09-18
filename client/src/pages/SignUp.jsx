import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import OAuth from '../components/OAuth'

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success === false) {
        setIsLoading(false)
        toast.error('Email Id already exist')
        return
      }
      navigate('/sign-in')
    } catch (error) {
      toast.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-mainColor">
      <div className="flex h-[calc(100vh-60px)] md:h-[calc(100vh-72px)] justify-center items-center">
        <div className="px-6 bg-white w-80 md:w-96 h-[475px] rounded-xl drop-shadow-xl">
          <h1 className="text-lg md:text-3xl text-center font-semibold my-4">
            Sign Up
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="username"
              name="username"
              className="border p-3 pl-4 rounded-lg"
              value={formData.username}
              onChange={handleChange}
              required
              minLength="3"
            />
            <input
              type="email"
              placeholder="username@email.com"
              name="email"
              className="border p-3 pl-4 rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="********"
              name="password"
              className="border p-3 pl-4 rounded-lg"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
              maxLength="20"
            />
            <button
              disabled={isLoading}
              type="submit"
              className="bg-black text-sm md:text-base text-white p-3 rounded-lg uppercase hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Sign Up'}
            </button>

            <OAuth title={'Sign Up with Google'} />
          </form>

          <div className="flex gap-2 mt-5 text-sm md:text-base">
            <p>Already have an account?</p>
            <Link to={'/sign-in'}>
              <span className="font-medium hover:underline">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
