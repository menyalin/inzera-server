const mongoose = require('mongoose')

const catalogSchema = new mongoose.Schema({
  name: String,
  description: {
    type: String
  },
  parent: [
    {
      type: String
    }
  ],
  rank: {
    type: Number,
    default: 50
  },
  type: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  mainImageUrl: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  }
})

module.exports = mongoose.model('Catalog', catalogSchema)
