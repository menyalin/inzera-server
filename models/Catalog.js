const mongoose = require('mongoose')

const catalogSchema = new mongoose.Schema({
  name: String,
  description: {
    type: String
  },
  parent: {
    type: String
  },
  type: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('Catalog', catalogSchema)
