require('dotenv').config()
const compression = require('compression')

const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const passport = require('passport')

const authRouter = require('./api/auth')
const catalogRouter = require('./api/catalog')
const priceRouter = require('./api/price')
const detailRouter = require('./api/detail')
const seriesRouter = require('./api/series')

const port = 3000

require('./mongoDB')

app.use(compression())
app.use(cors())
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
require('./middlewares/passport')(passport)
app.use('/api/static', express.static(path.join(__dirname, 'static')))

app.use(
  '/api/auth',
  cors(),
  // passport.authenticate('jwt', { session: false }),
  authRouter
)
app.use(
  '/api/catalog',
  cors(),
  // passport.authenticate('jwt', { session: false }),
  catalogRouter
)
app.use(
  '/api/price',
  cors(),
  // passport.authenticate('jwt', { session: false }),
  priceRouter
)
app.use(
  '/api/series',
  cors(),
  // passport.authenticate('jwt', { session: false }),
  seriesRouter
)
app.use(
  '/api/details',
  cors(),
  // passport.authenticate('jwt', { session: false }),
  detailRouter
)

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`)
})
