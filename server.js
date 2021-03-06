require('dotenv').config()
const compression = require('compression')

const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

const getUserFromJWT = require('./middlewares/getUserFromJWT')

const authRouter = require('./api/auth')
const catalogRouter = require('./api/catalog')
const priceRouter = require('./api/price')
const detailRouter = require('./api/detail')
const seriesRouter = require('./api/series')

const port = process.env.PORT || 3000

require('./mongoDB')

app.use(compression())
app.use(cors())
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/static', express.static(path.join(__dirname, 'static')))
app.use(getUserFromJWT)

app.use('/api/auth', cors(), authRouter)
app.use('/api/catalog', cors(), catalogRouter)
app.use('/api/price', cors(), priceRouter)
app.use('/api/series', cors(), seriesRouter)
app.use('/api/details', cors(), detailRouter)

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`)
})
