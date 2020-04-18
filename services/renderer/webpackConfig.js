require('dotenv').config()
const slsw = require('serverless-webpack')
const setServerlessConfig = require('@colin30/configs/serverless')

const serverlessConfig = setServerlessConfig(slsw.lib.entries)

if (process.env.STAGE === 'dev') {
  serverlessConfig.mode = 'development'
  serverlessConfig.devtool = 'nosources-source-map'
  serverlessConfig.optimization.minimize = false
  serverlessConfig.performance.hints = 'warning'
  serverlessConfig.output.sourceMapFilename = '[file].map'
} else {
  serverlessConfig.externals.push('aws-sdk')
}

module.exports = serverlessConfig
