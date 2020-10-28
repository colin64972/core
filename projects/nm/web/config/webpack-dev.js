require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { webConfig, nodeConfig } = require('./webpack')

const devVars = new EnvironmentPlugin({})

webConfig.plugins.push(devVars)
nodeConfig.plugins.push(devVars)

const configs = {
  webConfig,
  nodeConfig
}

module.exports = merge(configs[`${process.env.CONFIG_VER}Config`], {
  mode: 'development',
  devtool: 'source-map'
})
