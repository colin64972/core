require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { webConfig, preRendersConfig } = require('./webpack')

const proVars = new EnvironmentPlugin({})

webConfig.plugins.push(proVars)
preRendersConfig.plugins.push(proVars)

const configs = {
  webConfig,
  preRendersConfig
}

module.exports = merge(configs[`${process.env.CONFIG_VER}Config`], {
  mode: 'production'
})
