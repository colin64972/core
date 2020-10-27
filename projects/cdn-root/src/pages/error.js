require('dotenv').config()
const path = require('path')

module.exports = {
  fileName: 'error.html',
  templatePath: path.resolve('src', 'templates', 'error.pug'),
  locals: {
    title: 'Error',
    cdnUrl: process.env.CDN_URL,
    heading: `Error`,
    copy: 'Sorry, something went wrong'
  }
}
