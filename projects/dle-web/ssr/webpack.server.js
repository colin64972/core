require('colors')
require('dotenv').config()
const path = require('path')
const { EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    server: path.resolve('ssr', 'index.js')
  },
  output: {
    path: path.resolve('distServer'),
    filename: '[name].js'
  },
  target: 'node',
  resolve: {
    extensions: [
      '.css',
      '.gif',
      '.jpg',
      '.js',
      '.json',
      '.jsx',
      '.png',
      '.sass',
      '.svg',
      '.ts',
      '.tsx'
    ]
  },
  externals: [nodeExternals(), 'canvas'],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current'
                  },
                  modules: 'commonjs'
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.(woff(2)?|jpg|gif|png|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name: '[folder]/[name]-[contentHash].[ext]',
              publicPath: url =>
                `${process.env.TEST_CDN_URL}/${process.env.CDN_APP_FOLDER}/${url}`
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new EnvironmentPlugin({
      IS_SERVER: true
    })
  ]
}
