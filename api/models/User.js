import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnoTt0QfmbJHJ-9irEMqWlesCvEGMa9UXtkLnrdAKXyX_aXrszrKgTGhGnMNA5-6jGeRA&usqp=CAU",
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

export default User
