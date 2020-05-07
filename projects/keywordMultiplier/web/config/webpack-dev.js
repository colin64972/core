const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { config } = require('./webpack')

config.plugins.push(
  new EnvironmentPlugin({
    DEBUG: true,
    IS_BROWSER: true
  })
)

module.exports = merge(config, {
  mode: 'development',
  devtool: 'source-map',
  performance: {
    hints: 'warning'
  }
})
