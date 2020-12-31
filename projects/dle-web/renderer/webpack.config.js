require('colors')
require('dotenv').config()
const path = require('path')
const { EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  entry: {
    renderer: path.resolve('renderer', 'index.js')
  },
  output: {
    path: path.resolve('distRenderer'),
    filename: '[name].js'
  },
  target: 'node',
  resolve: {
    alias: {
      modernizr$: path.resolve('.modernizrrc.js')
    },
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
        loader: 'webpack-modernizr-loader',
        test: /\.modernizrrc\.js$/
      },
      {
        test: /\.(woff(2)?|jpg|gif|png|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name: '[folder]/[name]-[contentHash].[ext]',
              publicPath: url => {
                switch (process.env.SRC_ENV) {
                  case 'production':
                    return `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}/${url}`
                  case 'staging':
                    return `${process.env.STA_CDN_URL}/${process.env.CDN_APP_FOLDER}/${url}`
                  default:
                    return `/${url}`
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new EnvironmentPlugin({
      IS_SERVER: true,
      SRC_ENV: process.env.SRC_ENV,
      FREE_UNTIL: process.env.FREE_UNTIL
    })
  ]
}
