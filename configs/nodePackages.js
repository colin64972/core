const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const babelLoaderPlugins =
  process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : []

module.exports = entries => ({
  target: 'node',
  mode: 'production',
  entry: entries,
  optimization: { minimize: true },
  performance: { hints: 'error' },
  externals: [
    nodeExternals(),
    '@babel/core',
    '@babel/preset-env',
    '@babel/preset-react',
    '@colin30/configs',
    '@colin30/shared',
    '@material-ui/core',
    '@material-ui/icons',
    '@material-ui/styles',
    'axios',
    'babel-loader',
    'babel-plugin-transform-remove-console',
    'classnames',
    'clean-webpack-plugin',
    'faker',
    'file-loader',
    'gsap',
    'html-webpack-plugin',
    'lite-server',
    'lodash',
    'moment',
    'pug-loader',
    'pug',
    'react-dom',
    'react-intersection-observer',
    'react-redux',
    'react-router-dom',
    'react',
    'redux-form',
    'redux-logger',
    'redux-saga',
    'redux',
    'regenerator-runtime',
    'reselect',
    'webpack-cli',
    'webpack-merge',
    'webpack'
  ],
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
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['> 1%', 'last 2 versions']
                  }
                }
              ],
              '@babel/preset-react'
            ],
            plugins: babelLoaderPlugins
          }
        }
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  plugins: [new CleanWebpackPlugin({ verbose: true })]
})
