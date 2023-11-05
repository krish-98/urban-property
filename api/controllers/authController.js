import { errorHandler } from "../error.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({ email, username, password: hashedPassword })
    await newUser.save()

    if (!newUser) {
      return res.status(403).json({ message: "User not added" })
    }
    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404, "User not found!"))
    const validPassword = bcrypt.compareSync(password, validUser.password)
    if (!validPassword) return next(errorHandler(401, "Wrong crendetials!"))

    // Destructing the object to avoid sending the password to the client
    const { password: pass, ...rest } = validUser._doc

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest)
  } catch (error) {
    next(error)
  }
}
