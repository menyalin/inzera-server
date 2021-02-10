const SeriesModel = require('../../models/Series')

module.exports.getAllSeries = async () => {
  const res = await SeriesModel.find({})
  return res
}

module.exports.createSeries = async payload => {
  const res = await SeriesModel.create(payload)
  return res
}

module.exports.getSeriesById = async (id) => {
  const res = await SeriesModel.findById(id)
  return res
}

module.exports.updateSeries = async (_id, payload) => {
  const res = await SeriesModel.updateOne({ _id }, payload)
  return res
}

module.exports.deleteSeries = async _id => {
  const res = await SeriesModel.findByIdAndRemove(_id)
  return res
}

