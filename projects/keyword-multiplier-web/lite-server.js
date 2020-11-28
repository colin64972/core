const path = require('path')
const { setLiteServer } = require('@cjo3/configs/lite-server')
const colors = require('colors')

const publicPath = path.resolve('dist')

module.exports = setLiteServer(8001, path.resolve('dist'), [
  `${publicPath}/**/*.{html,css,js,jpg,png,gif,svg}`
])
