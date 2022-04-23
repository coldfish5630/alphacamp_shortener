const Shortener = require('../urlshortener')
const url = require('../../url.json').result
const db = require('../../config/mongoose')

db.once('open', () => {
  url.forEach(url => {
    Shortener.create(url)
  })
  console.log('done')
})
