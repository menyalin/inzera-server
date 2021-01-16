const { Schema, model } = require('mongoose')

const detailSchema = new Schema({
  name: String,
  description: String,
  type: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Detail', detailSchema)
