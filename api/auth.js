const express = require('express')
const router = express.Router()
const { signIn, signUp, getUserDataCtrl } = require('../controllers/auth')

router.post('/signIn', signIn)
router.post('/signUp', signUp)
router.get('/user', getUserDataCtrl)

module.exports = router
