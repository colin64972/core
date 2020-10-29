require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { webConfig, preRendersConfig } = require('./webpack')

const devVars = new EnvironmentPlugin({})

webConfig.plugins.push(devVars)
preRendersConfig.plugins.push(devVars)

const configs = {
  webConfig,
  preRendersConfig
}

module.exports = merge(configs[`${process.env.CONFIG_VER}Config`], {
  mode: 'development',
  devtool: 'source-map'
})
