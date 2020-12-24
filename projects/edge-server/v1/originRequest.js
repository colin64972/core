import 'colors'
import path from 'path'
import AWS from 'aws-sdk'
import { splitEnvVarList } from '@cjo3/shared/serverless/helpers'
import { buildHtmlRes, buildBucketKey } from './helpers'

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.S3_REGION,
  sslEnabled: true
})

const hostsList = splitEnvVarList(process.env.CDN_HOSTS)
const appsList = splitEnvVarList(process.env.APPS_LIST)
const appNames = splitEnvVarList(process.env.APP_NAMES)

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

    const Key = buildBucketKey(uri, appsList, appNames)

    const htmlFile = await s3
      .getObject({
        Bucket: host.replace('.s3.amazonaws.com', ''),
        Key
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
