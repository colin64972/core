const path = require('path')

module.exports = {
  fileName: 'error.html',
  templatePath: path.resolve('src', 'templates', 'error.pug'),
  locals: {
    title: 'Error',
    heading: 'Error',
    copy: 'Sorry, something went wrong'
  }
}
