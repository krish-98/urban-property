import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../../features/user/userSlice'
import OAuth from '../components/OAuth'

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, error } = useSelector((store) => store.user)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="flex h-[calc(100vh-60px)] md:h-[calc(100vh-72px)] justify-center items-center">
      <div className="px-6 bg-white w-80 md:w-96 h-[415px] rounded-xl">
        <h1 className="text-lg md:text-3xl text-center font-semibold my-7">
          Sign In
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
            disabled={loading}
            type="submit"
            className="bg-black text-sm md:text-base text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70"
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <OAuth />
        </form>

        <div className="flex gap-2 mt-5 text-sm md:text-base">
          <p>Don&apos;t have an Account?</p>
          <Link to={'/sign-up'}>
            <span className="font-medium hover:underline">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
