const path = require('path')
const setConfig = require('@colin30/configs/nodePackages')

const config = setConfig({
  constants: path.resolve('src', 'constants'),
  helpers: path.resolve('src', 'helpers'),
  webpack: path.resolve('src', 'webpack')
})

if (process.env.NODE_ENV === 'dev') {
  config.mode = 'development'
  config.devtool = 'nosources-source-map'
  config.optimization.minimize = false
  config.performance.hints = 'warning'
  config.output.sourceMapFilename = '[file].map'
} else {
  config.externals.push('aws-sdk')
}

module.exports = config
