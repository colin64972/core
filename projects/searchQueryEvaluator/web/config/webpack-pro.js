require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { config } = require('./webpack')

config.plugins.push(
  new EnvironmentPlugin({
    DEBUG: false,
    IS_BROWSER: true,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY_LIVE
  })
)

module.exports = merge(config, {
  mode: 'production'
})
