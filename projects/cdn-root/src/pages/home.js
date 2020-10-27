require('dotenv').config()
const path = require('path')

const cdnUrl = process.env.CDN_URL

module.exports = {
  fileName: 'index.html',
  templatePath: path.resolve('src', 'templates', 'home.pug'),
  locals: {
    cdnUrl,
    title: process.env.BRAND_NAME,
    logoSrc: `${cdnUrl}/logo.svg`
  }
}
