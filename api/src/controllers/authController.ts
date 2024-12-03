import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import { errorHandler } from '../utils/error'

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
      return next(errorHandler(400, 'Invalid Inputs!!!'))
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    })

    if (!newUser) {
      return next(errorHandler(403, 'User not added'))
    }

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    next(error)
  }
}

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return next(errorHandler(400, 'Invalid Inputs!!!'))
    }

    const validUser = await User.findOne({ email })
    if (!validUser) {
      return next(errorHandler(404, 'User not found!'))
    }

    const validPassword = await bcrypt.compare(password, validUser.password)
    if (!validPassword) {
      return next(errorHandler(401, 'Wrong crendetials!'))
    }

    // Destructing the object to avoid sending the password to the client
    // @ts-ignore
    const { password: pass, ...rest } = validUser._doc

    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET as string
    )
    res
      .cookie('token', token, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'none',
      })
      .status(200)
      .json(rest)
  } catch (error) {
    next(error)
  }
}

export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)
      //@ts-ignore
      const { password, ...rest } = user._doc

      res
        .cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 })
        .status(200)
        .json(rest)
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = await bcrypt.hash(generatedPassword, 10)

      const newUser = await User.create({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      })
      //@ts-ignore
      const { password, ...rest } = newUser._doc

      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET as string
      )

      res
        .cookie('token', token, {
          maxAge: 24 * 60 * 60 * 1000,
          secure: true,
          sameSite: 'none',
        })
        .status(200)
        .json(rest)
    }
  } catch (error) {
    next(error)
  }
}

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('token', { secure: true, sameSite: 'none' })
    res.status(200).json({ message: 'User has been logged out' })
  } catch (error) {
    next(error)
  }
}
