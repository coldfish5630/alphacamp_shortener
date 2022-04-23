const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlShortenerSchema = new Schema({
  sid: String,
  url: String
})

module.exports = mongoose.model('Shortener', urlShortenerSchema)
