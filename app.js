require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const exphbs = require('express-handlebars')
require('./config/mongoose')

const app = express()

const port = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`express is running on http://localhost:${port}`)
})
