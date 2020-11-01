import colors from 'colors'
import { WWW_HOST } from '@cjo3/shared/raw/constants/regex'
import { generateRedirect, buildHtmlRes } from './helpers'
import { splitAppsList, parseAppPage } from '@cjo3/shared/serverless/helpers'
import { minify } from 'html-minifier'
import compileReactPage from './compileReactPage.pug'
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.S3_REGION,
  sslEnabled: true
})

const appsList = splitAppsList(process.env.APPS_LIST)

export const viewerRequest = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const { request } = event.Records[0].cf

  if (!WWW_HOST.test(request.headers.host[0].value))
    return callback(null, request)

  const { uri, querystring } = request

  const res = generateRedirect(
    `https://${process.env.NEW_HOST}${uri}${
      querystring.length ? `?${querystring}` : ''
    }`
  )

  return callback(null, res)
}

export const originRequest = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = true

  const { request, response } = event.Records[0].cf

  const { uri, querystring } = request
  const { app, page, path, file } = parseAppPage(uri, appsList)

  if (file) {
    context.callbackWaitsForEmptyEventLoop = false
    request.uri = `${path}${file}`
    return callback(null, request)
  }

  if (!appsList.includes(app)) {
    context.callbackWaitsForEmptyEventLoop = false
    return callback(new Error('no such app'))
  }

  try {
    const rendersReq = await s3
      .getObject({
        Bucket: process.env.PRERENDERS_BUCKET,
        Key: `${app}.js`
      })
      .promise()

    const preRendersFile = rendersReq.Body.toString()

    const preRenderedPages = eval(preRendersFile).preRenders

    const { html, css, state } = preRenderedPages[page]

    const templateLocalsReq = await s3
      .getObject({
        Bucket: process.env.PRERENDERS_BUCKET,
        Key: 'templateLocals.js'
      })
      .promise()

    const templateLocalsFile = templateLocalsReq.Body.toString()

    const templateLocals = eval(templateLocalsFile)

    const pageMarkup = compileReactPage({
      ...templateLocals[app][page],
      appStyle: css,
      appMarkup: html,
      appState: state
    })

    const minifiedMarkup = minify(pageMarkup, {
      minifyCSS: true
    })

    const htmlRes = buildHtmlRes(minifiedMarkup)

    return callback(null, htmlRes)
  } catch (error) {
    console.error('ERROR originRequest'.yellow, error)
    return callback(error)
  }
}
