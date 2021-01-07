const SetPricesModel = require('../../models/SetPrices')
const Catalog = require('../../models/Catalog')
const PriceModel = require('../../models/Price')

module.exports.createSetPrice = async function (startDate, endDate, description) {
  const newSetPrices = await SetPricesModel.create({
    startDate,
    endDate,
    description
  })
  return newSetPrices
}

module.exports.getSkuDocs = async skuList => {
  const catalogItems = await Catalog.find({
    type: 'item',
    _id: skuList
  }).populate('prices')
  return catalogItems
}

module.exports.createPriceItem = async (sku, price, setPrice) => {
  /*
  sku - Документ mongoose,
  price - объект из запроса,
  setPrice - Документ из mongoose 
  */

  // добавить проверку на существование цены с этой же стартовой датой в SKU
  const existedPrices = sku.prices
    .filter(item => {
      const itemStartDate = new Date(item.startDate).toDateString()
      const setPriceStartDate = new Date(setPrice.startDate).toDateString()
      return itemStartDate === setPriceStartDate
    })
    .sort((a, b) => b.version - a.version)
  if (sku._id.toString() === price.sku) {
    const newPrice = await PriceModel.create({
      sku: sku._id,
      parent: setPrice._id,
      price: price.price,
      oldPrice: price.oldPrice,
      startDate: setPrice.startDate,
      endDate: setPrice.endDate,
      description: price.description,
      version: existedPrices[0] ? existedPrices[0].version + 1 : 0
    })
    return newPrice
  } else return null
}

module.exports.getAllSetPrices = async () => {
  const res = await SetPricesModel.find({}).populate('prices')
  return res
}

module.exports.getSetPriceById = async id => {
  const res = await SetPricesModel.findById(id).populate({
    path: 'prices',
    populate: { path: 'sku' }
  })
  return res
}

module.exports.deletePriceInPrices = async ids => {
  // удаляем цены в таблице Prices, на вход получаем массив _id price
  if (ids) {
    await PriceModel.deleteMany({ _id: ids })
  }
  return true
}

module.exports.deleteSetPrice = async setPriceId => {
  if (setPriceId) {
    await SetPricesModel.findByIdAndDelete(setPriceId)
  }
  return true
}
