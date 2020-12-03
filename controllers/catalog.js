const Catalog = require('../models/Catalog')

module.exports.createCatalogItem = async (req, res) => {
  try {
    const newItem = await Catalog.create({
      name: req.body.name,
      type: req.body.type,
      mainImageUrl: req.body.mainImageUrl,
      rank: req.body.rank,
      parent: req.body.parent,
      description: req.body.description,
      price: req.body.price
    })
    res.status(200).json(newItem)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getCatalogItems = async (req, res) => {
  const options = {
    type: req.query.type || 'group'
  }
  try {
    const catalogItems = await Catalog.find(options)
    res.status(200).json(catalogItems)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
