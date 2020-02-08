require('dotenv').config()
const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')

const baseConfig = {
  target: 'node',
  entry: slsw.lib.entries,
  optimization: { minimize: true },
  performance: { hints: 'error' },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: true
                    },
                    modules: 'commonjs'
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve('.output'),
    filename: '[name].js'
  }
}

if (process.env.STAGE === 'dev') {
  baseConfig.mode = 'development'
  baseConfig.devtool = 'nosources-source-map'
  baseConfig.optimization.minimize = false
  baseConfig.performance.hints = 'warning'
  baseConfig.output.sourceMapFilename = '[file].map'
}

module.exports = baseConfig
