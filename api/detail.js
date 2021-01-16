const express = require('express')
const router = express.Router()
const {
  getAllDetailsCtrl,
  newDetailCtrl,
  getDetailByIdCtrl,
  updateDetailCtrl,
  deleteDetailCtrl
} = require('../controllers/detail')

router.get('/', getAllDetailsCtrl)
router.get('/:id', getDetailByIdCtrl)
router.post('/', newDetailCtrl)
router.put('/:id', updateDetailCtrl)
router.delete('/:id', deleteDetailCtrl)

module.exports = router
