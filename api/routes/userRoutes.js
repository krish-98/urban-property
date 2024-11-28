import express from 'express'
import {
  updateUser,
  deleteUser,
  getUser,
  getUserListings,
} from '../controllers/userController.js'
import { verifyToken } from '../middlewares/verifyUser.js'

const router = express.Router()

router.put('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', getUser)
// router.get('/:id', verifyToken, getUser)

export default router
