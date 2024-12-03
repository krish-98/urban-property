// @ts-nocheck

import express from 'express'
import {
  createListing,
  deleteListing,
  getListing,
  getListings,
  updateListing,
} from '../controllers/listingController'
import { verifyToken } from '../middlewares/verifyUser'

const router = express.Router()

router.post('/create', verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing)
router.put('/update/:id', verifyToken, updateListing)
router.get('/get/:id', getListing)
router.get('/get', getListings)

export default router
