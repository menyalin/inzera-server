require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const passport = require('passport')

const authRouter = require('./api/auth')
const catalogRouter = require('./api/catalog')

const port = 3000

require('./mongoDb')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
require('./middlewares/passport')(passport)
app.use('/api/static', express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

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

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`)
})
