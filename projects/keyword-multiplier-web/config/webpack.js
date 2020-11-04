const path = require('path')
const localEnv = require('dotenv').config()
const sharedEnv = require('dotenv').config({
  path: path.resolve('..', 'shared', '.env')
})
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
  path.resolve('..', 'shared', 'react', 'template.pug'),
  {
    title: localEnv.parsed.TEMPLATE_TITLE
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
  SITE_NAME: localEnv.parsed.SITE_URL.replace(
    /^\w+:\/{2}(\w+.\w{2,3})(.*)$/i,
    '$1'
  ),
  SITE_URL: localEnv.parsed.SITE_URL,
  SITE_CONTACT_EMAIL: localEnv.parsed.SITE_CONTACT_EMAIL,
  COPYRIGHT_ENTITY: localEnv.parsed.COPYRIGHT_ENTITY,
  CDN_URL: localEnv.parsed.CDN_URL,
  CDN_APP_FOLDER: localEnv.parsed.CDN_APP_FOLDER,
  APP_ROOT_PATH: localEnv.parsed.APP_ROOT_PATH,
  AUTH_SECRET: sharedEnv.parsed.AUTH_SECRET,
  JWT_PRIVATE_KEY: sharedEnv.parsed.JWT_PRIVATE_KEY
})

webConfig.plugins.push(envVars)
preRendersConfig.plugins.push(envVars)

exports.webConfig = webConfig
exports.preRendersConfig = preRendersConfig
