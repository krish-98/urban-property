import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/userRoutes.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/api/user", userRouter)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connection established"))
  .catch((err) => console.log(err))

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`)
})
