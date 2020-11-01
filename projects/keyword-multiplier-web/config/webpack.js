require('dotenv').config()
const path = require('path')
const { setWebConfig, setPreRenderConfig } = require('@cjo3/configs/react')
const {
  setFileOutputPath,
  setFilePublicPath,
  setPreRenderFilePublicPath
} = require('@cjo3/shared/raw/general')
const { EnvironmentPlugin } = require('webpack')

const webConfig = setWebConfig(
  { src: path.resolve('src', 'index') },
  path.resolve('dist'),
  path.resolve('..', '..', 'shared', 'react', 'htmlPluginTemplate.pug'),
  {
    title: process.env.TEMPLATE_TITLE
  },
  setFileOutputPath,
  setFilePublicPath
)

const preRendersConfig = setPreRenderConfig(
  {
    [process.env.CDN_APP_FOLDER]: path.resolve('src', 'preRenders')
  },
  path.resolve('distPreRenders'),
  setPreRenderFilePublicPath
)

const envVars = new EnvironmentPlugin({
  SITE_NAME: process.env.SITE_URL.replace(
    /^\w+:\/{2}(\w+.\w{2,3})(.*)$/i,
    '$1'
  ),
  SITE_URL: process.env.SITE_URL,
  SITE_CONTACT_EMAIL: process.env.SITE_CONTACT_EMAIL,
  COPYRIGHT_ENTITY: process.env.COPYRIGHT_ENTITY,
  CDN_URL: process.env.CDN_URL,
  CDN_APP_FOLDER: process.env.CDN_APP_FOLDER,
  APP_ROOT_PATH: process.env.APP_ROOT_PATH,
  AUTH_SECRET: process.env.AUTH_SECRET,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
})

webConfig.plugins.push(envVars)
preRendersConfig.plugins.push(envVars)

exports.webConfig = webConfig
exports.preRendersConfig = preRendersConfig
