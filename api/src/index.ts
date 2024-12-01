import express, { Express, NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
// import path from 'path'

import authRouter from './routes/authRoutes'
import userRouter from './routes/userRoutes'
import listingRouter from './routes/listingRoutes'

dotenv.config()
// const __dirname = path.resolve()

const app: Express = express()
const PORT: number = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/listing', listingRouter)

// // Serve static files
// app.use(express.static(path.join(__dirname, '/client/dist')))

// app.get('*', (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
// })

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
    app.listen(3000, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => console.log(err))
