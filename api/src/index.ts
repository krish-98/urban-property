import express, { Express, NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import authRouter from './routes/authRoutes'
import userRouter from './routes/userRoutes'
import listingRouter from './routes/listingRoutes'

dotenv.config()

const app: Express = express()
const PORT: number = Number(process.env.PORT) || 3000

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/listing', listingRouter)

//@ts-ignore
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = err.statusCode || 500
  const message: string = err.message || 'Internal Server Error'

  return res.status(statusCode).json({ success: false, statusCode, message })
})

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Database connection established')

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => console.error(err))
