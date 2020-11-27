require('colors')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const { EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack')
const { ReactLoadablePlugin } = require('react-loadable/webpack')

const localEnv = require('dotenv').config()
const sharedEnv = require('dotenv').config({
  path: path.resolve('..', 'shared', '.env')
})

const switchPublicPath = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}/bundles/`
    case 'staging':
      return `${process.env.TEST_CDN_URL}/${process.env.CDN_APP_FOLDER}/bundles/`
    default:
      return '/'
  }
}

const config = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    src: path.resolve('src', 'index.ts')
  },
  output: {
    publicPath: switchPublicPath(),
    path: path.resolve('dist'),
    filename:
      process.env.NODE_ENV === 'development'
        ? '[name].[hash].js'
        : '[name].[contenthash].js'
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
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: module => {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`
          }
        }
      }
    }
  },
  target: 'web',
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.json',
      '.png',
      '.jpg',
      '.svg',
      '.gif'
    ]
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
      },
      {
        test: /\.(woff(2)?|jpg|gif|png|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true,
              name: '[folder]/[name]-[contentHash].[ext]',
              outputPath: url => url,
              publicPath: url => {
                switch (process.env.NODE_ENV) {
                  case 'production':
                    return `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}/${url}`
                  case 'staging':
                    return `${process.env.TEST_CDN_URL}/${process.env.CDN_APP_FOLDER}/${url}`
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
    new CleanWebpackPlugin({ verbose: true }),
    new HashedModuleIdsPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('..', 'shared', 'react', 'template.pug'),
      inject: true,
      publicPath: '/',
      scriptLoading: 'async',
      cache: false,
      templateLocals: {
        title: 'Hello'
      }
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
    }),
    new EnvironmentPlugin({
      IS_SERVER: false,
      ACCEPTED_FILETYPES: localEnv.parsed.ACCEPTED_FILETYPES,
      API_URL: localEnv.parsed.API_URL,
      APP_NAME: localEnv.parsed.APP_NAME,
      APP_ROOT_PATH: localEnv.parsed.APP_ROOT_PATH,
      AUTH_SECRET: sharedEnv.parsed.AUTH_SECRET,
      CDN_URL: localEnv.parsed.CDN_URL,
      CDN_APP_FOLDER: localEnv.parsed.CDN_APP_FOLDER,
      EXPORT_PRICE: localEnv.parsed.EXPORT_PRICE,
      JWT_PRIVATE_KEY: sharedEnv.parsed.JWT_PRIVATE_KEY,
      SITE_NAME: localEnv.parsed.SITE_NAME,
      SITE_URL: localEnv.parsed.SITE_URL,
      STRIPE_PUBLIC_KEY: localEnv.parsed.STRIPE_PUBLIC_KEY_TEST,
      STRIPE_URL: localEnv.parsed.STRIPE_URL,
      PAYMENT_DISABLED:
        localEnv.parsed.PAYMENT_DISABLED === 'true' ? true : false,
      SITE_CONTACT_EMAIL: sharedEnv.parsed.SITE_CONTACT_EMAIL,
      SUPPORT_EMAIL: sharedEnv.parsed.SUPPORT_EMAIL
    }),
    new ReactLoadablePlugin({
      filename: path.resolve('dist', 'react-loadable.json')
    })
  ]
}

module.exports = config
