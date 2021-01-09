const { Mongoose, Schema } = require('mongoose')
const Price = require('../../models/Price')
const {
  getSkuDocs,
  createPriceItem,
  createSetPrice,
  getAllSetPrices,
  getSetPriceById,
  deletePriceInPrices,
  deleteSetPrice
} = require('./logic')

module.exports.getPrice = async (req, res) => {
  const prices = await Price.find({}).populate('sku')
  res.status(200).json(prices)
}

// module.exports.createPrice = async (req, res) => {
//   try {
//     const sku = await Catalog.findById(req.body.sku).populate('prices')
//     if (!!sku && sku.type === 'item') {
//       const newPrice = await Price.create({
//         sku: req.body.sku,
//         price: req.body.price,
//         oldPrice: req.body.oldPrice,
//         startDate: new Date(req.body.startDate)
//       })

//       sku.prices.push(newPrice._id)

//       await sku.save()

//       res.status(200).json(newPrice)
//     } else res.status(400).json({ message: 'bad request' })
//   } catch (e) {
//     res.status(500).json({ message: 'createPrice request error!' })
//   }
// }

module.exports.setPrices = async (req, res) => {
  const { startDate, endDate, prices, description } = req.body
  if (!prices || !prices.length || !startDate) res.status(400).json({ message: 'bad request' })
  else {
    const skuList = prices.map(item => item.sku)
    const skuDocs = await getSkuDocs(skuList)
    const newSetPrice = await createSetPrice(startDate, endDate, description)
    for (let i = 0; i < skuDocs.length; i++) {
      const price = prices.find(price => price.sku === skuDocs[i]._id.toString())
      if (price) {
        const newPrice = await createPriceItem(skuDocs[i], price, newSetPrice)
        skuDocs[i].prices.push(newPrice._id)
        newSetPrice.prices.push(newPrice._id)
        await skuDocs[i].save()
      }
    }
    await newSetPrice.save()
    res.status(200).json(newSetPrice)
  }
}

module.exports.getSetPrices = async (req, res) => {
  const setPrices = await getAllSetPrices()
  res.status(200).json(setPrices)
}

module.exports.deleteSetPrice = async (req, res) => {
  const removedItemId = req.params._id
  try {
    const setPrice = await getSetPriceById(removedItemId)
    const price_ids = setPrice.prices.map(item => item._id)
    // очищаем ссылки на цены в таблице Catalog
    setPrice.prices.forEach(async price => {
      price.sku.prices = price.sku.prices.filter(item => {
        item._id.toString() !== price._id.toString()
      })
      await price.sku.save()
    })
    await deletePriceInPrices(price_ids)
    await deleteSetPrice(setPrice._id)
    res.status(200).json({ message: 'ok' })
  } catch (e) {
    res.status(500).json(e)
  }
}
