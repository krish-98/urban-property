import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../app/features/user/userSlice.js'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { toast } from 'sonner'
import { ClipLoader } from 'react-spinners'
import { app } from '../utils/firebase'

export default function OAuth({ title }) {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: result?.user?.displayName,
          email: result?.user?.email,
          photo: result?.user?.photoURL,
        }),
      })
      const data = await res.json()

      dispatch(signInSuccess(data))
      navigate('/')
      toast.success(`Welcome, ${data.username}`, { position: 'top-right' })
    } catch (error) {
      toast.warning(`${error.message}`)
      console.error('Could not sign in with google', error)
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
