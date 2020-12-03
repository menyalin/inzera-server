const express = require('express')
const router = express.Router()
const { createCatalogItem, getCatalogItems } = require('../controllers/catalog')

router.post('/', createCatalogItem)
router.get('/', getCatalogItems)

module.exports = router
