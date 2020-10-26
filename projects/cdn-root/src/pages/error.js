require('dotenv').config()
const path = require('path')

module.exports = {
  fileName: 'error.html',
  templatePath: path.resolve('src', 'templates', 'error.pug'),
  locals: {
    title: 'Error',
    heading: `Error - ${process.env.BRAND_NAME}`,
    copy: 'Sorry, something went wrong'
  }
}
