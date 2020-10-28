require('dotenv').config()
const path = require('path')
const { setWebConfig, setNodeConfig } = require('@cjo3/configs/react')
const {
  setFileOutputPath,
  setFilePublicPath
} = require('@cjo3/shared/raw/general')
const { EnvironmentPlugin } = require('webpack')

const webConfig = setWebConfig(
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
    title: process.env.TEMPLATE_TITLE
  },
  setFileOutputPath,
  setFilePublicPath
)

const nodeConfig = setNodeConfig(
  {
    app: path.resolve('src', 'App', 'index')
  },
  path.resolve('distNode'),
  setFilePublicPath
)

const envVars = new EnvironmentPlugin({
  CDN_BUCKET: process.env.CDN_BUCKET,
  CDN_APP_FOLDER: process.env.CDN_APP_FOLDER,
  COPYRIGHT_ENTITY: process.env.COPYRIGHT_ENTITY
})

webConfig.plugins.push(envVars)
nodeConfig.plugins.push(envVars)

exports.webConfig = webConfig
exports.nodeConfig = nodeConfig
