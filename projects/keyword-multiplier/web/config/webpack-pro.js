require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { webConfig, nodeConfig } = require('./webpack')

const proVars = new EnvironmentPlugin({
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY_LIVE,
  GA_TAG: process.env.GA_TAG,
  API_URL: process.env.API_URL_PRO
  // USE_MOCKS: process.env.USE_MOCKS
})

webConfig.plugins.push(proVars)
nodeConfig.plugins.push(proVars)

const configs = {
  webConfig,
  nodeConfig
}

module.exports = merge(configs[`${process.env.CONFIG_VER}Config`], {
  mode: 'production'
})
