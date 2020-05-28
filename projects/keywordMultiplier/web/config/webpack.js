const path = require('path')
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

exports.config = baseConfig
