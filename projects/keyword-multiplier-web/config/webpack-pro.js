require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { webConfig } = require('./webpack')

const proVars = new EnvironmentPlugin({
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY_LIVE,
  GA_TAG: process.env.GA_TAG,
  API_URL: process.env.API_URL_PRO
})

webConfig.plugins.push(proVars)

module.exports = merge(webConfig, {
  mode: 'production'
})
