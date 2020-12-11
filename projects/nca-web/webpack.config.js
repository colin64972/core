require('colors')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const { EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack')

const localEnv = require('dotenv').config()
const sharedEnv = require('dotenv').config({
  path: path.resolve('..', 'shared', '.env')
})

function setApiUrl() {
  let url = localEnv.parsed.API_URL_PRO
  if (process.env.BUILD_ENV === 'staging') {
    url = localEnv.parsed.API_URL_STA
  }
  if (process.env.BUILD_ENV === 'development') {
    url = localEnv.parsed.API_URL_DEV
  }
  return url
}

const switchPublicPath = () => {
  switch (process.env.BUILD_ENV) {
    case 'production':
      return `${process.env.CDN_URL_PRO}/${process.env.CDN_APP_FOLDER}/bundles/`
    case 'staging':
      return `${process.env.CDN_URL_STA}/${process.env.CDN_APP_FOLDER}/bundles/`
    default:
      return '/'
  }
}

const config = {
  mode: process.env.BUILD_ENV === 'development' ? 'development' : 'production',
  entry: {
    src: path.resolve('src', 'index.ts')
  },
  output: {
    publicPath: switchPublicPath(),
    path: path.resolve('dist'),
    filename:
      process.env.BUILD_ENV === 'development'
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
                switch (process.env.BUILD_ENV) {
                  case 'production':
                    return `${process.env.CDN_URL_PRO}/${process.env.CDN_APP_FOLDER}/${url}`
                  case 'staging':
                    return `${process.env.CDN_URL_STA}/${process.env.CDN_APP_FOLDER}/${url}`
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
      publicPath: switchPublicPath(),
      scriptLoading: 'async',
      cache: false,
      templateLocals: {
        title: localEnv.parsed.APP_NAME
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
      BUILD_ENV: localEnv.parsed.BUILD_ENV,
      APP_NAME: localEnv.parsed.APP_NAME,
      SITE_NAME: localEnv.parsed.SITE_NAME,
      SITE_URL: localEnv.parsed.SITE_URL,
      SITE_CONTACT_EMAIL: localEnv.parsed.SITE_CONTACT_EMAIL,
      RESUME_FILENAME: localEnv.parsed.RESUME_FILENAME,
      CDN_APP_FOLDER: localEnv.parsed.CDN_APP_FOLDER,
      CDN_URL_STA: localEnv.parsed.CDN_URL_STA,
      CDN_URL_PRO: localEnv.parsed.CDN_URL_PRO,
      GITHUB_URL_NCA: localEnv.parsed.GITHUB_URL_NCA,
      GITHUB_URL_DLE: localEnv.parsed.GITHUB_URL_DLE,
      GITHUB_URL_KM: localEnv.parsed.GITHUB_URL_KM,
      GITHUB_URL_NT: localEnv.parsed.GITHUB_URL_NT,
      APP_URL_DLE: localEnv.parsed.APP_URL_DLE,
      APP_URL_KM: localEnv.parsed.APP_URL_KM,
      APP_URL_NT: localEnv.parsed.APP_URL_NT,
      JWT_PRIVATE_KEY: sharedEnv.parsed.JWT_PRIVATE_KEY,
      AUTH_SECRET: sharedEnv.parsed.AUTH_SECRET,
      API_URL: setApiUrl()
    })
  ]
}

module.exports = config
