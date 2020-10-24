const path = require('path')
const slsw = require('serverless-webpack')
const setServerlessConfig = require('@cjo3/configs/serverless')
const { EnvironmentPlugin } = require('webpack')

const sharedEnv = require('dotenv').config({
  path: path.resolve('..', '..', 'shared', '.env')
})

const serverlessConfig = setServerlessConfig(slsw.lib.entries)

serverlessConfig.plugins = [
  new EnvironmentPlugin({
    APPS_LIST: sharedEnv.parsed.APPS_LIST
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
