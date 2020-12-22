const express = require('express')
const router = express.Router()
const { createPrice } = require('../controllers/price')

router.post('/', createPrice)

module.exports = router
