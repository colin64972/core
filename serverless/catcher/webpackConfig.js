require('dotenv').config()
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const setServerlessConfig = require('@colin30/configs/serverless')

const serverlessConfig = setServerlessConfig(slsw.lib.entries, nodeExternals)

if (process.env.STAGE === 'dev') {
  serverlessConfig.mode = 'development'
  serverlessConfig.devtool = 'nosources-source-map'
  serverlessConfig.optimization.minimize = false
  serverlessConfig.performance.hints = 'warning'
  serverlessConfig.output.sourceMapFilename = '[file].map'
}

module.exports = serverlessConfig
