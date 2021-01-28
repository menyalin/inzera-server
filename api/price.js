const express = require('express')
const router = express.Router()
const {
  getPrice,
  createSetPricesCtrl,
  updateSetPricesCtrl,
  getSetPrices,
  deleteSetPrice,
  getSetPriceByIdCtrl
} = require('../controllers/price')

// router.post('/', createPrice)
// root - /api/price/

router.get('/', getPrice)
router.get('/setPrices', getSetPrices)
router.get('/setPrices/:_id', getSetPriceByIdCtrl)

router.post('/setPrices', createSetPricesCtrl)
router.put('/setPrices/:_id', updateSetPricesCtrl)
router.delete('/setPrices/:_id', deleteSetPrice)

module.exports = router
