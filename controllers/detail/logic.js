const DetailModel = require('../../models/Detail')

module.exports.getAllDetails = async () => {
  const res = await DetailModel.find({})
  return res
}

module.exports.createDetail = async newDetail => {
  const res = await DetailModel.create(newDetail)
  return res
}

module.exports.getDetailById = async id => {
  const res = await DetailModel.findById(id)
  return res
}

module.exports.updateDetail = async (_id, payload) => {
  const res = await DetailModel.updateOne({ _id }, payload)
  return res
}

module.exports.deleteDetail = async _id => {
  const res = await DetailModel.findByIdAndRemove(_id)
  return res
}
