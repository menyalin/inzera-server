const CatalogModel = require('../../models/Catalog')

const _sortingPrices = (a, b) => {
  if (new Date(a.startDate) > new Date(b.startDate)) return -1
  if (new Date(a.startDate) < new Date(b.startDate)) return 1
  // если startDate равны
  if (a.version > b.version) return -1
  if (a.version < b.version) return 1
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
      if (catalogItems[i].type === 'item' && catalogItems[i].prices.length > 1) {
        const sortedPrices = catalogItems[i].prices.sort(_sortingPrices)
        catalogItems[i].prices = Object.assign({}, sortedPrices[0])
      }
    }
  } else {
    catalogItems = await CatalogModel.find(options)
  }
  return catalogItems
}
