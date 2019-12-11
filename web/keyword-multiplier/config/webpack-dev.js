const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
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
