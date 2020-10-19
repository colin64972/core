const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const { setTemplateLocals } = require('@cjo3/shared/raw/general')

const babelLoaderPlugins =
  process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : []

exports.setConfig = (entry, outputPath, template, templateLocals) => ({
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
              outputPath: (url, resourcePath, context) => `assets/${url}`,
              publicPath: (url, resourcePath, context) =>
                process.env.NODE_ENV === 'development'
                  ? `assets/${url}`
                  : `${process.env.npm_package_config_assetsUrl}/${process.env.npm_package_config_assetProjectName}/${url}`
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new HtmlWebpackPlugin({
      template,
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
