const { Schema, model } = require('mongoose')

const SetPricesSchema = new Schema({
  startDate: Date,
  endDate: Date,
  description: String,
  prices: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Price'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = model('SetPrice', SetPricesSchema)
