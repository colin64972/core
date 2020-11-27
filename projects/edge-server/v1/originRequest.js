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

    if (!hostsList.includes(host)) {
      context.callbackWaitsForEmptyEventLoop = false
      return callback(new Error('no such host'))
    }

    const { app, page, filePath, fileName } = parseAppPage(uri, appsList)

    if (fileName) {
      context.callbackWaitsForEmptyEventLoop = false
      request.uri = `${filePath}${fileName}`
      return callback(null, request)
    }

    if (!appsList.includes(app)) {
      context.callbackWaitsForEmptyEventLoop = false
      return callback(new Error('no such app'))
    }

    let appFolder = ''
    let htmlFile = ''
    let markup = ''

    if (process.env.IS_LOCAL) {
      switch (app) {
        case appsList[2]:
          appFolder = 'dle-web'
          break
        case appsList[1]:
          appFolder = `${appsList[1]}-web`
          break
      }

      htmlFile = path.resolve(
        '..',
        '..',
        '..',
        appFolder,
        'distPreRenders',
        `${page}.html`
      )

      markup = fs.readFileSync(htmlFile).toString()
    } else {
      htmlFile = await s3
        .getObject({
          Bucket: host.replace('.s3.amazonaws.com', ''),
          Key: `${app}/pre-renders/${page}.html`
        })
        .promise()
      markup = htmlFile.Body.toString()
    }

    const res = buildHtmlRes(markup)

    return res
  } catch (error) {
    console.error('ERROR originRequest'.yellow, error)
    return callback(error)
  }
}
