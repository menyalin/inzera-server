const { Schema, model } = require('mongoose')

const seriesSchema = new Schema({
  name: String,
  sku: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Catalog'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Series', seriesSchema)
