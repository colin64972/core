import 'colors'
import fs from 'fs'
import path from 'path'
import AWS from 'aws-sdk'
import { parseAppPage, splitEnvVarList } from '@cjo3/shared/serverless/helpers'
import { buildHtmlRes } from './helpers'

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.S3_REGION,
  sslEnabled: true
})

const hostsList = splitEnvVarList(process.env.CDN_HOSTS)
const appsList = splitEnvVarList(process.env.APPS_LIST)

export const handler = async (event, context, callback) => {
  try {
    context.callbackWaitsForEmptyEventLoop = true

    const { request } = event.Records[0].cf
    const { uri, headers } = request
    const host = headers.host[0].value

    // throw error for invalid hosts
    if (!hostsList.includes(host)) {
      context.callbackWaitsForEmptyEventLoop = false
      return callback(new Error('no such host'))
    }

    const parsedUri = path.parse(uri)

    // pass on requests for files to origin
    if (parsedUri.ext !== '') {
      context.callbackWaitsForEmptyEventLoop = false
      return callback(null, request)
    }

    let appFolder = 'nca'

    appsList.forEach(app => {
      if (uri.includes(app)) {
        appFolder = app
      }
    })

    const preRenderFile = getAppPage(appFolder, uri)

    const htmlFile = await s3
      .getObject({
        Bucket: host.replace('.s3.amazonaws.com', ''),
        Key: `${appFolder}/pre-renders/${preRenderFile}`
      })
      .promise()

    const markup = htmlFile.Body.toString()

    const res = buildHtmlRes(markup)

    return res
  } catch (error) {
    console.error('ERROR originRequest'.yellow, error)
    return callback(error)
  }
}

function getAppPage(app, uri) {
  const errorPage = 'error.html'
  let prefix
  let suffix

  if (app === 'nca') {
    if (uri === '/') return 'home.html'
    if (/\/resume\/?$/.test(uri)) return 'resume.html'
    if (/\/apps\/?$/.test(uri)) return 'apps.html'
    if (/\/contact\/?$/.test(uri)) return 'contact.html'
    return errorPage
  }

  if (app === appsList[1]) {
    prefix = `/apps/${appsList[1]}`
    if (uri === prefix || uri === `${prefix}/`) return 'home.html'
    return errorPage
  }

  if (app === appsList[2]) {
    prefix = `/apps/${appsList[2]}`
    suffix = uri.replace(prefix, '')
    if (uri === prefix || uri === `${prefix}/`) return 'home.html'
    if (/\/converter\/?$/.test(suffix)) return 'home-converter.html'
    if (/\/converter\/guide\/?$/.test(suffix))
      return 'home-converter-guide.html'
    return errorPage
  }
}
