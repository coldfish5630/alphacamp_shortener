const Shortener = require('../models/urlshortener')

module.exports = function shortener (length) {
  return new Promise((resolve, reject) => {
    const chars =
      '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'
    let sid = ''
    for (i = 0; i < length; i++) {
      const num = Math.floor(Math.random() * chars.length)
      sid += chars[num]
    }
    //確認sid是否與資料庫有重複
    Shortener.find({ sid: `${sid}` }, (err, exists) => {
      if (err) {
        console.log(err)
      }
      if (exists.length) {
        shortener(length)
      } else if (!exists.length) {
        resolve(sid)
      }
    })
  })
}
