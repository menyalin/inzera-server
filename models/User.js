const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  login: {
    index: true,
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

userSchema.methods.createToken = async function () {
  const token = await jwt.sign(
    {
      userId: this._id
    },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '31d' }
  )
  return `Bearer ${token}`
}

userSchema.methods.isCorrectPassword = async function (pass) {
  const res = await bcrypt.compare(pass, this.password)
  return !!res
}

userSchema.pre('save', function (next) {
  const tmpUser = this
  if (this.isModified('password')) {
    bcrypt.hash(tmpUser.password, 10, (_, hash) => {
      tmpUser.password = hash
      next()
    })
  } else {
    next()
  }
})

module.exports = mongoose.model('User', userSchema)
