const moment = require('moment')
const CatalogModel = require('../../models/Catalog')
const SeriesModel = require('../../models/Series')
const PriceModel = require('../../models/Price')

const _sortingPrices = (a, b) => {
  if (new Date(a.startDate) > new Date(b.startDate)) return -1
  if (new Date(a.startDate) < new Date(b.startDate)) return 1
  // если startDate равны
  if (a.version > b.version) return -1
  if (a.version < b.version) return 1
}

const _getActualPrice = catalogItem => {
  // принимает на вход экземпляр mongoose CatalogItem
  if (catalogItem.type === 'item' && catalogItem.prices.length >= 1) {
    const sortedPrices = catalogItem
    .prices
    .sort(_sortingPrices)
    return [...sortedPrices]
  } else {
    return []
  }
}

module.exports.getItems = async (options, withPrices = false, priceOptions) => {
  let catalogItems = []
  if (withPrices) {
    catalogItems = await CatalogModel.find(options).populate({
      path: 'prices',
      match: priceOptions
    }).sort({rank: 1})
    // получаем актуальные цены на товар
    for (let i = 0; i < catalogItems.length; i++) {
      catalogItems[i].prices = _getActualPrice(catalogItems[i])
    }
  } else {
    catalogItems = await CatalogModel.find(options)
  }
  return catalogItems
}

module.exports.getCatalogById = async (id, date) => {
  if (!date) date = moment().format('YYYY-MM-DD')
  const priceOptions = {
    startDate: { $lte: date },
    $or: [{ endDate: { $gte: date } }, { endDate: null }]
  }
  try {
    const item = await CatalogModel.findById(id)
      .populate({
        path: 'prices',
        match: priceOptions
      })
      .populate('brand')
      .populate('company')
      .populate('recomendation')
      .populate('sommelier')
      .populate({
        path: 'series',
        populate: {
          path: 'sku',
          match: { isActive: true }
        }
      })

    item.prices = _getActualPrice(item)
    return item
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

module.exports.deleteCatalogById = async (_id) => {
    await CatalogModel.deleteOne({_id })
    return true
}

module.exports.deleteCatalogFromSeries = async skuId => {
  let series = await SeriesModel.find({ sku: skuId })
  for (let i = 0; i < series.length; i++) {
    series[i].sku = series[i].sku.filter(item => item.toString() !== skuId.toString())
    await series[i].save()
  }
  return true
}

module.exports.getPricesIdByCatalogId = async skuId => {
  let prices = await PriceModel.find({ sku: skuId })
  return prices.map(item => item._id)
}
