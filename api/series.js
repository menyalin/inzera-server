const express = require('express')
const router = express.Router()
const {
  getAllCtrl,
  getByIdCtrl,
  createCtrl,
  updateCtrl,
  deleteCtrl
} = require('../controllers/series')

router.get('/', getAllCtrl)
router.get('/:id', getByIdCtrl)
router.post('/', createCtrl)
router.put('/:id', updateCtrl)
router.delete('/:id', deleteCtrl)

module.exports = router
