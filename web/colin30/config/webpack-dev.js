const { merge } = require('webpack-merge')
const { EnvironmentPlugin } = require('webpack')
const webpack = require('./webpack')

webpack.plugins.push(
  new EnvironmentPlugin({
    DEBUG: true,
    IS_BROWSER: true
  })
)

module.exports = merge(webpack, {
  mode: 'development',
  devtool: 'source-map',
  performance: {
    hints: 'warning'
  }
})
