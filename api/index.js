import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(3000, () => {
      console.log(
        `Connected to MongoDB database and the Server is running on port ${PORT}`
      )
    })
  )
  .catch((err) => console.log(err))

app.get("/", (req, res) => {
  res.json({ message: "Hello World" })
})
