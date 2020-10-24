require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { webConfig } = require('./webpack')

webConfig.plugins.push(
  new EnvironmentPlugin({
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY_LIVE
  })
)

module.exports = merge(webConfig, {
  mode: 'production'
})
