require('dotenv').config()
const path = require('path')
const { EnvironmentPlugin } = require('webpack')
const { setConfig } = require('@colin30/configs/react')

const baseConfig = setConfig(
  { src: path.resolve('src', 'index') },
  path.resolve('dist'),
  path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'shared',
    'react',
    'htmlPluginTemplate.pug'
  ),
  {
    title: process.env.npm_package_config_template_title
  }
)

const { KEYWORDS_EVERYWHERE_API_KEY } = process.env

baseConfig.plugins.push(
  new EnvironmentPlugin({
    KEYWORDS_EVERYWHERE_API_KEY
  })
)

exports.config = baseConfig
