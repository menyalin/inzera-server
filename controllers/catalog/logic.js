const moment = require('moment')
const { populate } = require('../../models/Catalog')
const CatalogModel = require('../../models/Catalog')

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
    const sortedPrices = catalogItem.prices.sort(_sortingPrices)
    return Object.assign({}, sortedPrices[0])
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
    })
    // получаем актуальную цену на товар
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
