const { Schema, model } = require('mongoose')

const catalogSchema = new Schema({
  name: String,
  nameForSeries: String,
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
  series: {
    type: Schema.Types.ObjectId,
    ref: 'Series'
  },
  sommelier: {
    type: Schema.Types.ObjectId,
    ref: 'Detail'
  },
  recomendation: {
    type: Schema.Types.ObjectId,
    ref: 'Detail'
  },
  volume: Number,
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Detail'
  },
  mainImageUrl: String,
  images: [String],
  description: String,
  sku: String,
  skuType: String,
  segment: String,
  abv: Number,
  containSubgroups: Boolean,
  containSku: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

catalogSchema.methods.deletePrice = async function (priceId) {
  this.prices = this.prices.filter(item => item.toString() !== priceId)
  this.save()
}

module.exports = model('Catalog', catalogSchema)
