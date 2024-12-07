import express from 'express'
import {
  signIn,
  signUp,
  googleAuth,
  signOut,
} from '../controllers/authController'

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/google', googleAuth)
router.get('/signout', signOut)

export default router
