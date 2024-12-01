import express from 'express'
import {
  signin,
  signup,
  googleAuth,
  signOut,
} from '../controllers/authController'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', googleAuth)
router.get('/signout', signOut)

export default router
