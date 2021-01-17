const {
  getAllDetails,
  createDetail,
  getDetailById,
  updateDetail,
  deleteDetail
} = require('./logic')

module.exports.getAllDetailsCtrl = async (req, res) => {
  try {
    const allDetails = await getAllDetails()
    res.status(200).json(allDetails)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.newDetailCtrl = async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.type) res.status(400).json({ message: 'bad request' })
  try {
    const newDetail = await createDetail(req.body)
    res.status(200).json(newDetail)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getDetailByIdCtrl = async (req, res) => {
  const _id = req.params.id
  if (!_id) res.status(400).json({ message: 'bad request, no _id param' })
  try {
    const detail = await getDetailById(_id)
    res.json(detail)
  } catch (e) {
    res.status(500).json({ message: 'error in "getDetailByIdCtrl"' })
  }
}

module.exports.updateDetailCtrl = async (req, res) => {
  const _id = req.params.id
  if (!_id) res.status(400).json({ message: 'bad request, no _id param' })
  if (!req.body.name || !req.body.description || !req.body.type) res.status(400).json({ message: 'bad request' })
  const payload = {
    type: req.body.type,
    name: req.body.name,
    description: req.body.description
  }
  try {
    const updatedDetail = await updateDetail(_id, payload)
    res.json(updatedDetail)
  } catch (e) {
    res.status(500).json({ message: 'error in "updateDetailCtrl"' })
  }
}

module.exports.deleteDetailCtrl = async (req, res) => {
  const _id = req.params.id
  if (!_id) res.status(400).json({ message: 'bad request, no _id param' })
  try {
    await deleteDetail(_id)
    res.json({ message: 'the detail was successfully deleted' })
  } catch (e) {
    res.status(500).json({ message: 'error in "deleteDetailCtrl"' })
  }
}
