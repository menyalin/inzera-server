const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  if (!!req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET)
      req.userId = decode.userId
      next()
    } catch (e) {
      // res.sendStatus(511)
      next()
    }
  } else {
    next()
  }
}
