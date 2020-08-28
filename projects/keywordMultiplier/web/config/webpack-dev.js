require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { config } = require('./webpack')

config.plugins.push(
  new EnvironmentPlugin({
    DEBUG: true,
    IS_BROWSER: true,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY_TEST
  })
)

module.exports = merge(config, {
  mode: 'development',
  devtool: 'source-map',
  performance: {
    hints: 'warning'
  }
})
