const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 8080
const app = express()
app.use(cors)

app.get('/h', (req, res) => {
  console.log('req')
  res.send('hello')
  res.end()
})

app.listen(PORT, () => {
  console.log('listening')
})