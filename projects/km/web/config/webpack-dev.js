require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { webConfig, nodeConfig } = require('./webpack')

const devVars = new EnvironmentPlugin({
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY_TEST,
  USE_MOCKS: process.env.USE_MOCKS,
  GA_TAG: process.env.GA_TAG
})

webConfig.plugins.push(devVars)
nodeConfig.plugins.push(devVars)

module.exports = [
  merge(webConfig, {
    mode: 'development',
    devtool: 'source-map'
  }),
  merge(nodeConfig, {
    mode: 'development',
    devtool: 'source-map'
  })
]
