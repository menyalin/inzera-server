const Catalog = require('../models/Catalog')
const fs = require('fs/promises')
const path = require('path')

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
