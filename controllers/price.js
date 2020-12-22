const Price = require('../models/Price')

module.exports.createPrice = async (req, res) => {
  res.status(200).json({ message: 'new price' })
}
