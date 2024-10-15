import express from 'express'
import {
  updateUser,
  deleteUser,
  getUserLisitng,
  getUser,
} from '../controllers/userController.js'
import { verifyToken } from '../middlewares/verifyUser.js'

const router = express.Router()

router.put('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserLisitng)
// router.get('/:id', verifyToken, getUser)
router.get('/:id', getUser)

export default router
