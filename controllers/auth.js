const User = require('../models/User')

module.exports.signIn = async (req, res) => {
  try {
    const { login, password } = req.body
    if (!login || !password) res.status(500).json({ message: 'bad params' })
    const tmpUser = await User.findOne({ login, isActive: true })
    if (!!tmpUser && (await tmpUser.isCorrectPassword(password))) {
      res.status(200).json({ token: await tmpUser.createToken() })
    } else res.status(400).json({ message: 'user not found' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.signUp = async (req, res) => {
  const { login, password } = req.body
  if (!login || !password) res.status(500).json({ message: 'invalid request data' })
  try {
    const newUser = await User.create({ login, password })
    res.status(201).json({ token: await newUser.createToken() })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getUserDataCtrl = async (req, res) => {
  try {
    if (req.userId) {
      const tmpUser = await User.findById(req.userId)
      res.status(200).json(tmpUser)
    } else res.status(511).json({ message: 'bad token' })
  } catch (e) {
    res.sendStatus(500)
  }
}
