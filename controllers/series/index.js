const { getAllSeries, getSeriesById, updateSeries, deleteSeries, createSeries } = require('./logic')

module.exports.getAllCtrl = async (req, res) => {
  try {
    const result = await getAllSeries()
    res.json(result)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports.getByIdCtrl = async (req, res) => {
  const id = req.params.id
  if (!id) res.status(400).json({ message: 'bad request' })
  try {
    const result = await getSeriesById(id)
    res.json(result)
  } catch (e) {
    res.status(500).json({ message: 'error in "getByIdCtrl" -  series' })
  }
}

module.exports.createCtrl = async (req, res) => {
  if (!req.body.name) res.status(400).json({ message: 'bad request' })
  try {
    const result = await createSeries(req.body)
    res.status(200).json(result)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.updateCtrl = async (req, res) => {
  const _id = req.params.id
  if (!_id) res.status(400).json({ message: 'bad request, no _id param' })
  if (!req.body.name) res.status(400).json({ message: 'bad request' })
  const payload = {
    name: req.body.name,
    sku: req.body.sku
  }
  try {
    const updatedRes = await updateSeries(_id, payload)
    res.json(updatedRes)
  } catch (e) {
    res.status(500).json({ message: 'error in "updateCtrl" series' })
  }
}

module.exports.deleteCtrl = async (req, res) => {
  const _id = req.params.id
  if (!_id) res.status(400).json({ message: 'bad request, no _id param' })
  try {
    await deleteSeries(_id)
    res.json({ message: 'the detail was successfully deleted' })
  } catch (e) {
    res.status(500).json({ message: 'error in "deleteCtrl" - series' })
  }
}
