const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const { setTemplateLocals } = require('@cjo3/shared/raw/general')
const nodeExternals = require('webpack-node-externals')

const babelLoaderPlugins = []
// process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : []

exports.setWebConfig = (
  entry,
  outputPath,
  templatePath,
  templateLocals,
  setFileOutputPath,
  setFilePublicPath
) => ({
  entry,
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  performance: {
    hints: 'warning'
  },
  devServer: {
    contentBase: outputPath,
    compress: true,
    port: 8001,
    hot: true,
    writeToDisk: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.sass',
      '.css',
      '.png',
      '.jpg',
      '.svg',
      '.gif'
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
      },
      {
        test: /\.pug$/,
        exclude: /(node_modules)/,
        loader: 'pug-loader'
      },
      {
        test: /\.(woff(2)?|jpg|gif|png|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true,
              name: '[folder]/[name].[ext]',
              outputPath: setFileOutputPath,
              publicPath: setFilePublicPath
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new HtmlWebpackPlugin({
      template: templatePath,
      inject: true,
      scriptLoading: 'defer',
      cache: false,
      templateLocals: setTemplateLocals(templateLocals)
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 75
          }
        }
      ],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true
    })
  ]
})

exports.setNodeConfig = (entry, outputPath, setFilePublicPath) => ({
  entry,
  output: {
    path: outputPath,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  optimization: { minimize: process.env.NODE_ENV === 'production' },
  devServer: {
    contentBase: outputPath,
    compress: true,
    port: 8002,
    hot: true,
    writeToDisk: true,
    historyApiFallback: true
  },
  performance: { hints: 'warning' },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.sass',
      '.css',
      '.png',
      '.jpg',
      '.svg',
      '.gif'
    ]
  },
  externals: [nodeExternals(), 'react', 'react-dom', '@material-ui/core'],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current'
                  },
                  modules: 'commonjs'
                }
              ],
              '@babel/preset-react'
            ],
            plugins: babelLoaderPlugins
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
              name: '[folder]/[name].[ext]',
              publicPath: setFilePublicPath
            }
          }
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin({ verbose: true })]
})
