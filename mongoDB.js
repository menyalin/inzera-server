const mongoose = require('mongoose')

const db_url = process.env.DB_URL

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

mongoose
  .connect(db_url, options)
  .then(console.log('mongo is connected'))
  .catch(err => {
    throw new Error(err)
  })
