require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { webConfig } = require('./webpack')

webConfig.plugins.push(
  new EnvironmentPlugin({
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY_TEST,
    USE_MOCKS: process.env.USE_MOCKS
  })
)

module.exports = merge(webConfig, {
  mode: 'development',
  devtool: 'source-map'
})
