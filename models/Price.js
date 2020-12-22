const mongoose,
  { Schema } = require('mongoose')

const priceSchema = new Schema({
  sku: {
    type: Schema.Types.ObjectId,
    ref: 'Catalog'
  },
  price: Number,
  oldPrice: Number,
  unit: {
    type: String
  },
  currency: {
    type: String,
    default: 'руб'
  },
  startDate: {
    type: Date,
    default: Date.now()
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Price', priceSchema)
