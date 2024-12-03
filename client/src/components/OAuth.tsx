import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../app/features/user/userSlice.ts'

import { toast } from 'sonner'
import { ClipLoader } from 'react-spinners'

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../utils/firebase.ts'

export default function OAuth({ title }: { title: string }) {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

      const res = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/google`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: result?.user?.displayName,
            email: result?.user?.email,
            photo: result?.user?.photoURL,
          }),
        }
      )

      const data = await res.json()

      dispatch(signInSuccess(data))
      navigate('/')
      toast.success(`Welcome, ${data.username}`, { position: 'top-right' })
    } catch (error) {
      if (error instanceof Error) {
        toast.warning(`${error.message}`)
        console.error('Could not sign in with Google', error)
      } else {
        toast.warning('An unknown error occurred')
        console.error('Could not sign in with Google', error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      disabled={loading}
      className="bg-red-600 flex items-center justify-center gap-1.5 text-sm md:text-base text-white p-3 rounded-lg hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-400"
    >
      {loading && <ClipLoader color="#fff" size={14} />}
      <span>{title}</span>
    </button>
  )
}
