const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { setTemplateLocals } = require('@colin30/shared/webpack')

const babelLoaderPlugins =
  process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : []

module.exports = (entry, outputPath, template, templateLocals) => ({
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
              name: '[name].[ext]',
              outputPath: 'assets',
              publicPath: filename => `assets/${filename}`
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
    })
  ]
})
