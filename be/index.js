const express = require('express')
const path = require('path')

const app = express()

app.use(express.json({ extended: true })) 
// auth
app.use('/api', require('./routes/auth.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'build')))
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 3003

app.listen(PORT, () => console.log(`server is listening on ${PORT}`))

