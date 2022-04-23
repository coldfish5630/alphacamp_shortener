const express = require('express')
const router = express.Router()

const Shortener = require('../../models/urlshortener')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:sid', (req, res) => {
  const sid = req.params.sid
  Shortener.find({ sid: `${sid}` }, (err, result) => {
    const link = result
    if (err) {
      console.log(err)
    } else if (!result.length) {
      console.log('the page is not exists')
    } else if (result.length) {
      res.redirect(`${link[0].url}`)
    }
  })
})

module.exports = router
