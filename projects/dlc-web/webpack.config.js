const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const localEnv = require('dotenv').config()

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: path.resolve('src', 'index.ts')
  },
  devServer: {
    contentBase: path.resolve('dist'),
    publicPath: '/',
    compress: true,
    port: 8001,
    hot: true,
    writeToDisk: true,
    historyApiFallback: true
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.pug$/,
        exclude: /(node_modules)/,
        loader: 'pug-loader'
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new HtmlWebpackPlugin({
      template: path.resolve('..', 'shared', 'react', 'template.pug'),
      inject: true,
      scriptLoading: 'defer',
      cache: false,
      templateLocals: {
        title: 'Hello'
      }
    }),
    new EnvironmentPlugin({
      APP_PATH: localEnv.parsed.APP_PATH,
      APP_NAME: localEnv.parsed.APP_NAME,
      ACCEPTED_FILETYPES: localEnv.parsed.ACCEPTED_FILETYPES,
      EXPORT_PRICE: localEnv.parsed.EXPORT_PRICE,
      USE_MOCKS: localEnv.parsed.USE_MOCKS,
      SITE_CONTACT_EMAIL: localEnv.parsed.SITE_CONTACT_EMAIL,
      SITE_NAME: localEnv.parsed.SITE_NAME,
      SITE_URL: localEnv.parsed.SITE_URL
    })
  ]
}
