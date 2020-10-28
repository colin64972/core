require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { webConfig, nodeConfig } = require('./webpack')

const proVars = new EnvironmentPlugin({})

webConfig.plugins.push(proVars)
nodeConfig.plugins.push(proVars)

const configs = {
  webConfig,
  nodeConfig
}

module.exports = merge(configs[`${process.env.CONFIG_VER}Config`], {
  mode: 'production'
})
