const User = require('../models/User')

module.exports.signIn = async (req, res) => {
  try {
    if (!req.body.login || !req.body.password) throw new Error('invalid request data')
    const { login, password } = req.body
    const tmpUser = await User.findOne({ login, isActive: true })
    if (!!tmpUser && (await tmpUser.isCorrectPassword(password))) {
      res.status(200).json({ token: await tmpUser.createToken() })
    } else res.status(400).json({ message: 'user not found' })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.signUp = async (req, res) => {
  try {
    if (!req.body.login || !req.body.password) throw new Error('invalid request data')
    const { login, password } = req.body
    const newUser = await User.create({ login, password })
    res.status(201).json({ token: await newUser.createToken() })
  } catch (e) {
    throw e
  }
}

module.exports.getUserDataCtrl = async (req, res) => {
  try {
    if (req.userId) {
      const tmpUser = await User.findById(req.userId)
      res.status(200).json(tmpUser)
    } else res.status(511).json({ message: 'bad token' })
  } catch (e) {
    throw new Error('error in getUserDataCtrl')
  }
}
