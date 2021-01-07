const { Schema, model } = require('mongoose')

const priceSchema = new Schema({
  sku: {
    type: Schema.Types.ObjectId,
    ref: 'Catalog'
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'SetPrice'
  },
  price: Number,
  oldPrice: Number,
  unit: {
    type: String,
    default: 'шт'
  },
  currency: {
    type: String,
    default: 'руб'
  },
  startDate: {
    type: Date,
    default: Date.now()
  },
  endDate: {
    type: Date,
    default: null
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  version: {
    type: Number,
    default: 0
  }
})

module.exports = model('Price', priceSchema)
