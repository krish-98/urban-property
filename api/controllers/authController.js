import User from "../models/User.js"
import bcrypt from "bcrypt"

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
