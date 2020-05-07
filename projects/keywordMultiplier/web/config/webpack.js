const path = require('path')
const { setConfig } = require('@colin30/configs/react')

exports.config = setConfig(
  { src: path.resolve('src', 'index') },
  path.resolve('static'),
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
