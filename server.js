const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || process.argv[2] || 8081
const app = express()
app.listen(PORT, () => {
  console.log('listening')
})

app.use(cors())

app.get('/redirect', (req, res) => {
  console.log('req')
  res.status(308)
  res.set('Location', 'https://www.google.com')
  res.end('hello')
})
