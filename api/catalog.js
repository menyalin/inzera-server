const express = require('express')
const router = express.Router()
const { createCatalogItem, getCatalogItems, allImageUrls, getCatalogByIdCtrl } = require('../controllers/catalog')

router.post('/', createCatalogItem)
router.get('/', getCatalogItems)
router.get('/:id', getCatalogByIdCtrl)
router.get('/images', allImageUrls)

module.exports = router
