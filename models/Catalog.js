const mongoose = require('mongoose')

const catalogSchema = new mongoose.Schema({
  name: String,
  description: {
    type: String
  },
  parent: [String],
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
  prices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refs: 'Price'
    }
  ],
  mainImageUrl: String,
  images: [String],
  description: String,
  sku: String,
  containSubgroups: Boolean,
  containSku: Boolean
})

module.exports = mongoose.model('Catalog', catalogSchema)
