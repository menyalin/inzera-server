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

module.exports.createSetPricesCtrl = async (req, res) => {
  const { startDate, endDate, prices, description, isPromo, discount, promoDescription } = req.body
  if (!prices.length || !startDate) res.status(400).json({ message: 'bad request' })
  else {
    const skuList = prices.map(item => item.sku)
    const skuDocs = await getSkuDocs(skuList)
    const newSetPrice = await createSetPrice(
      startDate,
      endDate,
      description,
      isPromo,
      discount,
      promoDescription
    )
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
module.exports.updateSetPricesCtrl = async (req, res) => {
  try {
    if (!req.userId) res.status(403).json({ message: 'no auth' })
    if (!req.body.prices.length || !req.body.startDate)
      res.status(400).json({ message: 'bad request' })
    const setPriceFields = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      isPromo: req.body.isPromo,
      discount: req.body.discount,
      promoDescription: req.body.promoDescription
    }
    const setPriceId = req.params._id
    if (!setPriceId) res.sendStatus(400)
    let updatingSetPrice = await getSetPriceById(setPriceId)
    // Удаляем ссылки на цены из CatalogItem
    updatingSetPrice.prices.forEach(async price => {
      await price.sku.deletePrice(price._id.toString())
    })
    // Удаляем цены из таблицы Prices
    const priceIds = updatingSetPrice.prices.map(item => item._id)
    await deletePriceInPrices(priceIds)

    updatingSetPrice.prices = [] // Очищаем таблицу с ценами в SetPrice

    updatingSetPrice = Object.assign(updatingSetPrice, setPriceFields) // Обновляем реквизиты SetPrice
    const skuList = req.body.prices.map(item => item.sku)
    const skuDocs = await getSkuDocs(skuList)
    for (let i = 0; i < skuDocs.length; i++) {
      const price = req.body.prices.find(price => price.sku === skuDocs[i]._id.toString())
      if (price) {
        const newPrice = await createPriceItem(skuDocs[i], price, updatingSetPrice)
        skuDocs[i].prices.push(newPrice._id)
        updatingSetPrice.prices.push(newPrice._id)
        await skuDocs[i].save()
      }
    }
    await updatingSetPrice.save()
    res.status(200).json(updatingSetPrice)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}

module.exports.getSetPrices = async (req, res) => {
  const setPrices = await getAllSetPrices()
  res.status(200).json(setPrices)
}

module.exports.deleteSetPrice = async (req, res) => {
  const removedItemId = req.params._id
  if (!removedItemId) res.sendStatus(400)
  try {
    const setPrice = await getSetPriceById(removedItemId)
    const price_ids = setPrice.prices.map(item => item._id)
    // очищаем ссылки на цены в таблице Catalog
    setPrice.prices.forEach(async price => {
      await price.sku.deletePrice(price._id.toString())
    })
    await deletePriceInPrices(price_ids)
    await deleteSetPrice(setPrice._id)
    res.status(200).json({ message: 'ok' })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getSetPriceByIdCtrl = async (req, res) => {
  const _id = req.params._id
  try {
    const setPrice = await getSetPriceById(_id)
    res.json(setPrice)
  } catch (e) {
    res.status(500).json(e)
  }
}
