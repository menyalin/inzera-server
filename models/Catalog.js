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
  mainImageUrl: String,
  images: [String],
  description: {
    type: String
  },
  sku: {
    type: String
  }
})

module.exports = mongoose.model('Catalog', catalogSchema)
