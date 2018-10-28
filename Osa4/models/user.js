const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  ofAge: Boolean,
  passwordHash: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    ofAge: user.ofAge,
    blogs: user.blogs
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User