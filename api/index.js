import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  return res.status(statusCode).json({ success: false, statusCode, message })
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connection established"))
  .catch((err) => console.log(err))

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`)
})
