const User = require('../models/User')

module.exports.signIn = async (req, res) => {
  const { login, password } = req.body
  res.json({ message: 'signIn Method', login, password })
}

module.exports.signUp = async (req, res) => {
  const { login, password } = req.body
  if (!login || !password) res.status(500).json({ message: 'invalid request data' })
  try {
    const newUser = await User.create({ login, password })
    res.json({ token: await newUser.createToken(), mesasge: 'created successfully' })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}
