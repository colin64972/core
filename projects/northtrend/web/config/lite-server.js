const path = require('path')
const setServer = require('@northtrend/configs/lite-server')

module.exports = setServer(1000, path.resolve('static'), [
  `${path.join('static')}/**/*.{html,css,js}']`
])
