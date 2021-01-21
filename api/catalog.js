const express = require('express')
const router = express.Router()
const {
  createCatalogItem,
  getCatalogItems,
  allImageUrls,
  getCatalogByIdCtrl
} = require('../controllers/catalog')

router.get('/images', allImageUrls)
router.post('/', createCatalogItem)
router.get('/', getCatalogItems)
router.get('/:id', getCatalogByIdCtrl)

module.exports = router
