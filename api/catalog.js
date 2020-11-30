const express = require('express')
const router = express.Router()
const {} = require('../controllers/catalog')

router.post('/signIn', signIn)
router.post('/signUp', signUp)
router.get('/getMe', getMe)

module.exports = router
