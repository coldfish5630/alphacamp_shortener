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
    //確認sid是否與資料庫有重複
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
//確認輸入的內容是否為網址
function validateForm (longURL) {
  const re = /http:\/\/|https:\/\//
  return re.test(longURL)
}

router.post('/', (req, res) => {
  const longURL = req.body.longURL.trim()
  if (!longURL || !validateForm(longURL)) {
    return res.render('error', { longURL })
  }
  //從資料庫尋找是否有相同的網址
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
      //有相同的網址就直接產生相同的短網址
      res.render('index', { sid: url[0].sid })
    }
  })
})

module.exports = router
