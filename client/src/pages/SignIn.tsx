import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { SignInFormData } from '../types'
import OAuth from '../components/OAuth'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from '../app/features/user/userSlice'

export default function SignIn() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((store) => store.user)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        toast.error(data.message)
        return
      }

      dispatch(signInSuccess(data))
      navigate('/')
      toast.success(`Welcome, ${data?.username}`, {
        position: 'bottom-right',
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(signInFailure(error.message))
        toast.error(error.message)
      } else {
        dispatch(signInFailure('An unknown error occurred'))
        toast.error('An unknown error occurred')
      }
    }
  }

  return (
    <div className="bg-mainColor">
      <div className="flex h-[calc(100vh-68px)] md:h-[calc(100vh-80px)] justify-center items-center">
        <div className="px-6 bg-white w-80 md:w-96 h-[415px] rounded-xl drop-shadow-xl">
          <h1 className="text-lg md:text-3xl text-center font-semibold my-7">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="username@email.com"
              className="border p-3 pl-4 rounded-lg"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="********"
              className="border p-3 pl-4 rounded-lg"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              disabled={loading}
              type="submit"
              className="bg-black text-sm md:text-base text-white p-3 rounded-lg uppercase hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>

            <OAuth title={'Sign In with Google'} />
          </form>

          <div className="flex gap-2 mt-5 text-sm md:text-base">
            <p>Don&apos;t have an Account?</p>
            <Link to={'/sign-up'}>
              <span className="font-medium hover:underline">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
