const { merge } = require('webpack-merge')
const { EnvironmentPlugin } = require('webpack')
const base = require('./webpack')

base.plugins.push(
  new EnvironmentPlugin({
    DEBUG: false,
    IS_BROWSER: true
  })
)

module.exports = merge(base, {
  mode: 'production',
  performance: {
    hints: 'warning'
  }
})
