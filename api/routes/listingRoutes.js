import express from "express"
import {
  createListing,
  deleteListing,
  updateListing,
} from "../controllers/lisitingController.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.post("/create", verifyToken, createListing)
router.delete("/delete/:id", verifyToken, deleteListing)
router.put("/update/:id", verifyToken, updateListing)

export default router
