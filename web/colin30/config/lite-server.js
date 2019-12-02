const path = require('path')
const setServer = require('@colin30/configs/lite-server')

module.exports = setServer(1000, path.resolve('static'), [
  `${path.join('static')}/**/*.{html,css,js}']`
])
