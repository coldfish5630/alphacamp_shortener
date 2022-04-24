const router = require('express').Router()
const Shortener = require('../../models/urlshortener')

function shortener () {
  return new Promise((resolve, reject) => {
    const chars =
      '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'
    const charsArr = chars.split('')
    let arr = []
    for (i = 0; i < 5; i++) {
      const num = Math.floor(Math.random() * charsArr.length)
      arr.push(charsArr[num])
    }
    const sid = arr.join('')
    Shortener.find({ sid: `${sid}` }, (err, exists) => {
      if (err) {
        console.log(err)
      }
      if (exists.length) {
        shortener()
      } else if (!exists.length) {
        resolve(sid)
      }
    })
  })
}

function validateForm (longURL) {
  const re = /http:\/\/|https:\/\//
  return re.test(longURL)
}

router.post('/', (req, res) => {
  const longURL = req.body.longURL.trim()
  if (!longURL) {
    return
  } else if (!validateForm(longURL)) {
    return
  }
  Shortener.find({ url: `${longURL}` }, (err, result) => {
    const url = result
    if (err) {
      console.log(err)
    }
    if (!result.length) {
      shortener()
        .then(sid => Shortener.create({ sid: sid, url: longURL }))
        .then(obj => res.render('index', { sid: obj.sid }))
        .catch(error => console.error(error))
    } else if (result.length) {
      res.render('index', { sid: url[0].sid })
    }
  })
})

module.exports = router
