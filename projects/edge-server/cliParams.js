require('dotenv').config()

exports.invalidate = {
  id: process.env.CDN_ID,
  paths: '/*'
}
