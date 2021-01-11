const Catalog = require('../../models/Catalog')
const fs = require('fs/promises')
const path = require('path')
const { getItems } = require('./logic')

module.exports.allImageUrls = async (req, res) => {
  const reqFolder = req.query.folder
  const getFilesInDir = async (folder = './static', acm = []) => {
    const fileNames = await fs.readdir(folder)
    for (let i = 0; i < fileNames.length; i++) {
      let currentPath = path.join(folder, fileNames[i])
      const stats = await fs.stat(currentPath)
      if (stats.isDirectory()) {
        acm.push(...(await getFilesInDir(currentPath)))
      } else {
        acm.push(currentPath)
      }
    }
    return acm
  }
  const result = (await getFilesInDir(reqFolder))
    .map(file => file.split(path.sep))
    .map(image => ({
      url: image.join('/'),
      name: image[image.length - 1],
      folders: image.filter((item, idx) => item !== 'static' && idx !== image.length - 1)
    }))
  res.json(result)
}

module.exports.createCatalogItem = async (req, res) => {
  try {
    const catalogItem = {
      name: req.body.name,
      type: req.body.type,
      mainImageUrl: req.body.mainImageUrl,
      rank: req.body.rank,
      parent: req.body.parent,
      description: req.body.description,
      sku: req.body.sku,
      images: req.body.images,
      containSubgroups: req.body.containSubgroups,
      containSku: req.body.containSku
    }
    if (req.body._id) {
      const updatedItem = await Catalog.findByIdAndUpdate(req.body._id, catalogItem)
      res.status(200).json(updatedItem)
    } else {
      const newItem = await Catalog.create(catalogItem)
      res.status(200).json(newItem)
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getCatalogItems = async (req, res) => {
  const options = {}
  const priceOptions = {}
  let withPrices = true
  if (req.query._id) {
    options._id = req.query._id
  }
  if (req.query.parent) {
    if (req.query.parent === 'root') options.parent = []
    else options.parent = req.query.parent
  }
  if (req.query.forItems) {
    options.type = 'group'
    options.parent = { $ne: [] }
    withPrices = false
  }
  if (req.query.allGroups) {
    options.type = 'group'
    withPrices = false
  }
  if (req.query.allItems) {
    options.type = 'item'
    withPrices = false
  }
  if (req.query.search) {
    options.type = 'item'
    options.name = { $regex: new RegExp(req.query.search, 'i') }
  }
  if (req.query.date) {
    priceOptions.startDate = { $lte: req.query.date }
    priceOptions.$or = [{ endDate: { $gte: req.query.date } }, { endDate: null }]
  }
  try {
    const catalogItems = await getItems(options, withPrices, priceOptions)
    res.status(200).json(catalogItems)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
