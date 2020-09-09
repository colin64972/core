const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { config } = require('./webpack')

config.plugins.push(
  new EnvironmentPlugin({
    DEBUG: false,
    IS_BROWSER: true
  })
)

module.exports = merge(config, {
  mode: 'production',
  performance: {
    hints: 'error'
  }
})
