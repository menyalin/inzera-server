const express = require('express')
const router = express.Router()
const { createCatalogItem, getCatalogItems, allImageUrls } = require('../controllers/catalog')

router.post('/', createCatalogItem)
router.get('/', getCatalogItems)
router.get('/images', allImageUrls)

module.exports = router
