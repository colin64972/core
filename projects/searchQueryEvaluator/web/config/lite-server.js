const path = require('path')
const { setServer } = require('@colin30/configs/lite-server')

module.exports = setServer(8001, path.resolve('dist'), [
  `${path.join('dist')}/**/*.{html,css,js}']`
])
