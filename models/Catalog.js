const { Schema, model } = require('mongoose')

const catalogSchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: 'Price'
    }
  ],
  mainImageUrl: String,
  images: [String],
  description: String,
  sku: String,
  containSubgroups: Boolean,
  containSku: Boolean
})

module.exports = model('Catalog', catalogSchema)
