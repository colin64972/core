const slsw = require('serverless-webpack')
const setServerlessConfig = require('@cjo3/configs/serverless')
const { EnvironmentPlugin } = require('webpack')
const localEnv = require('dotenv').config()

const serverlessConfig = setServerlessConfig(slsw.lib.entries, true)

serverlessConfig.plugins = [
  new EnvironmentPlugin({
    NEW_HOST: localEnv.parsed.NEW_HOST
  })
]

if (process.env.NODE_ENV === 'development') {
  serverlessConfig.mode = 'development'
  serverlessConfig.devtool = 'nosources-source-map'
  serverlessConfig.optimization.minimize = false
  serverlessConfig.output.sourceMapFilename = '[file].map'
} else {
  serverlessConfig.externals.push('aws-sdk')
}

module.exports = serverlessConfig
