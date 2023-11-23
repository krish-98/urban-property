import express from "express"
import {
  test,
  updateUser,
  deleteUser,
  getUserLisitng,
} from "../controllers/userController.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.get("/test", test)
router.put("/update/:id", verifyToken, updateUser)
router.delete("/delete/:id", verifyToken, deleteUser)
router.get("/listings/:id", verifyToken, getUserLisitng)

export default router
