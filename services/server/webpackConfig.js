require('dotenv').config()
const slsw = require('serverless-webpack')
const setServerlessConfig = require('@cjo3/configs/serverless')

const serverlessConfig = setServerlessConfig(slsw.lib.entries, true)

if (process.env.NODE_ENV === 'development') {
  serverlessConfig.mode = 'development'
  serverlessConfig.devtool = 'nosources-source-map'
  serverlessConfig.optimization.minimize = false
  serverlessConfig.output.sourceMapFilename = '[file].map'
} else {
  serverlessConfig.externals.push('aws-sdk')
}

module.exports = serverlessConfig
