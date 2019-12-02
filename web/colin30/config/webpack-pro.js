const { merge } = require('webpack-merge')
const { EnvironmentPlugin } = require('webpack')
const webpack = require('./webpack')

webpack.plugins.push(
  new EnvironmentPlugin({
    DEBUG: false,
    IS_BROWSER: true
  })
)

module.exports = merge(webpack, {
  mode: 'production',
  performance: {
    hints: 'error'
  }
})
