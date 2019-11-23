const path = require('path')
const setReact = require('@colin30/configs/react')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

console.log(process.env)

const base = setReact(
  {
    src: path.resolve('src', 'index')
  },
  path.resolve('.dist'),
  'assets'
)

base.plugins.push(
  new CleanWebpackPlugin({
    verbose: true
  })
)

module.exports = base
