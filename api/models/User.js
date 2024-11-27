import { model, Schema } from 'mongoose'

const userSchema = new Schema(
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
    },
  },
  { timestamps: true }
)

// Pre-save middleware to set the avatar based on the username
userSchema.pre('save', function (next) {
  if (!this.avatar) {
    if (this.username) {
      this.avatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${this.username}&flip=false&backgroundColor=fff7f2&?base=default`
    } else {
      this.avatar = `https://avatar.iran.liara.run/username?username=${this.username}&background=fff7f2&color=191919`
    }
  }

  next()
})

const User = model('User', userSchema)

export default User
