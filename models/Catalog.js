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
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Detail'
  },
  mainImageUrl: String,
  images: [String],
  description: String,
  sku: String,
  containSubgroups: Boolean,
  containSku: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Catalog', catalogSchema)
