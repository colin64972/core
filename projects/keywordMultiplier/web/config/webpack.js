const path = require('path')
const { setConfig } = require('@colin30/configs/react')
const { EnvironmentPlugin } = require('webpack')

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

baseConfig.plugins.push(
  new EnvironmentPlugin({
    SITE_NAME: process.env.SITE_NAME,
    SITE_URL: process.env.SITE_URL,
    SITE_CONTACT: process.env.SITE_CONTACT
  })
)

exports.config = baseConfig
