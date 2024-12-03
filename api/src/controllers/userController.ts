// @ts-nocheck

import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'
import Listing from '../models/Listing'
import { errorHandler } from '../utils/error'

// Custom Request type to include `user`
interface CustomRequest extends Request {
  user?: {
    id: string
    // Add other properties in your JWT payload if necessary
  }
}

export const updateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'))

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10)
    }

    // Don't do it like this $set: {...req.body} it causes problems. Also dont't forget to add {new: true}
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    )
    const { password, ...rest } = updatedUser._doc

    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'))

  try {
    await User.findByIdAndDelete(req.params.id)
    res.clearCookie('access_token')
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export const getUserListings = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id })
      res.status(200).json(listings)
    } catch (error) {
      next(error)
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'))
  }
}

export const getUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return next(errorHandler(404, 'User not found'))
    }

    const { password: pass, ...rest } = user._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}
