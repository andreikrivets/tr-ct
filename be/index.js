const express = require('express')
require('dotenv').config()
const config = require('config')
const path = require('path')
const { Sequelize } = require('sequelize')

const app = express()

app.use(express.json({ extended: true })) 
// auth
app.use('/api/auth', require('./routes/auth.routes'))
// imagekit
app.use('/api/ik', require('./routes/imagekit.routes'))
// collection
app.use('/api/collection', require('./routes/collection.routes'))
// profile
app.use('/api/user', require('./routes/profile.routes'))
// tags
app.use('/api/tags', require('./routes/tags.routes'))
// items
app.use('/api/item', require('./routes/item.routes'))
// search
app.use('/api/search', require('./routes/search.routes'))
// main page
app.use('/api/last', require('./routes/last.routes'))




if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../', './fe', 'build')))
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../', './fe', 'build', 'index.html'))
  })
}

const sequelize = new Sequelize(
  config.get("dbName"), 
  config.get("dbUsername"), 
  config.get("dbPassword"), {
    host: config.get("dbServer"),
    dialect: 'mysql'
  });

const start = async () => {
  try {
      await sequelize.authenticate();
  } catch (e) {
      console.log('server error', e.message)
      sequelize.close() 
      process.exit(500)
  }
}

start()


const PORT = process.env.PORT || 3003

app.listen(PORT, () => console.log(`server is listening on ${PORT}`))