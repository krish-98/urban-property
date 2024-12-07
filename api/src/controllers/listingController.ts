// @ts-nocheck
import { NextFunction, Request, Response } from 'express'
import Listing from '../models/Listing'
import { errorHandler } from '../utils/error'

// Custom Request type to include `user`
interface CustomRequest extends Request {
  user?: {
    id: string
  }
}

export const createListing = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const listing = await Listing.create(req.body)

    return res.status(201).json({ success: true, message: listing })
  } catch (error) {
    next(error)
  }
}

export const deleteListing = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const listing = await Listing.findById(req.params.id)

  if (!listing) {
    return next(errorHandler(404, 'Lising not found'))
  }

  if (req.user?.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listing'))
  }

  try {
    await Listing.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Listing has been deleted!' })
  } catch (error) {
    next(error)
  }
}

export const updateListing = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const listing = await Listing.findById(req.params.id)

  if (!listing) {
    return next(errorHandler(401, 'Listing not found!'))
  }

  if (req.user?.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'))
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedListing)
  } catch (error) {
    next(error)
  }
}

export const getListing = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      'userRef',
      '-password'
    )

    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'))
    }

    res.status(200).json(listing)
  } catch (error) {
    next(error)
  }
}

export const getListings = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 9
    const startIndex = parseInt(req.query.startIndex as string) || 0

    let offer = req.query.offer
    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] }
    }

    let furnished = req.query.furnished
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] }
    }

    let parking = req.query.parking
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] }
    }

    let type = req.query.type
    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] }
    }

    const searchTerm = req.query.searchTerm || ''
    const sort = req.query.sort || 'createdAt'
    const order = req.query.order || 'desc'

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' }, //regex => shows whether some part of the words are present in the search term, options => don't care about the uppercase or lowercase in the search
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex)

    return res.status(200).json(listings)
  } catch (error) {
    next(error)
  }
}
