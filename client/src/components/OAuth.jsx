import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js'
import { signInSuccess } from '../features/user/userSlice.js'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'

export default function OAuth() {
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

      setLoading(false)
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      setLoading(false)
      toast.warning(`Could not sign in with google ${error.message}`, {
        position: 'top-center',
        style: {
          backgroundColor: 'red',
          color: 'white',
        },
      })
      console.log('Could not sign in with google', error)
    }
  }

  return (
    <>
      <button
        onClick={handleGoogleClick}
        type="button"
        disabled={loading}
        className="bg-red-600 flex items-center justify-center gap-1 text-sm md:text-base text-white p-3 rounded-lg hover:bg-red-500 disabled:cursor-not-allowed"
      >
        {loading && <ClipLoader color="#fff" size={15} />}
        <span>Continue with Google</span>
      </button>
    </>
  )
}
