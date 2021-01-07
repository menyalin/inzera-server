const express = require('express')
const router = express.Router()
const { createPrice, getPrice, setPrices, getSetPrices, deleteSetPrice } = require('../controllers/price')

// router.post('/', createPrice)
// root - /api/price/

router.get('/', getPrice)
router.get('/setPrices', getSetPrices)
router.post('/setPrices', setPrices)
router.delete('/setPrices/:_id', deleteSetPrice)

module.exports = router
