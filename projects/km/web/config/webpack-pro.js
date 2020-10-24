require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { webConfig, nodeConfig } = require('./webpack')

const proVars = new EnvironmentPlugin({
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY_LIVE,
  GA_TAG: process.env.GA_TAG
})

webConfig.plugins.push(proVars)
nodeConfig.plugins.push(proVars)

module.exports = [
  merge(webConfig, {
    mode: 'production'
  }),
  merge(nodeConfig, {
    mode: 'production'
  })
]
