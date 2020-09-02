require('dotenv').config()
const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')

const baseConfig = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: process.env.STAGE,
  devtool: 'nosources-source-map',
  optimization: {
    minimize: false
  },
  performance: {
    hints: 'warning'
  },
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
    filename: '[name].js',
    sourceMapFilename: '[file].map'
  }
}

if (process.env.STAGE === 'production') {
  baseConfig.optimization.minimize = true
  baseConfig.performance.hints = 'error'
  delete baseConfig.devtool
  delete baseConfig.output.sourceMapFilename
}

module.exports = baseConfig
