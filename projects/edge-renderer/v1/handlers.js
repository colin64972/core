import colors from 'colors'
import { WWW_HOST } from '@cjo3/shared/raw/constants/regex'
import { generateRedirect, buildHtmlRes } from './helpers'
import { splitAppsList, parseAppPage } from '@cjo3/shared/serverless/helpers'
import compileReactPage from './templates/compileReactPage.pug'
import { templateLocals } from './templates/locals'
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
  // console.log('LOG request'.yellow, request)

  const { uri, querystring } = request
  const { app, page, path, file } = parseAppPage(uri, appsList)
  // console.log('LOG app, page, path, file'.yellow, app, page, path, file)

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
    const s3Req = await s3
      .getObject({
        Bucket: process.env.PRERENDERS_BUCKET,
        Key: `${app}.js`
      })
      .promise()
    // console.log('LOG s3Req'.yellow, s3Req)

    const preRendersFile = s3Req.Body.toString()

    const preRenderedPages = eval(preRendersFile).preRenders

    // console.log('LOG preRenderedPages'.yellow, preRenderedPages)

    const { html, css, state } = preRenderedPages[page]

    // console.log('LOG html, css, state'.yellow, html, css, state)

    const pageMarkup = compileReactPage({
      ...templateLocals[app][page],
      appStyle: css,
      appMarkup: html,
      appState: state
    })

    // console.log('LOG pageMarkup'.yellow, pageMarkup)

    return import(
      /* webpackChunkName: "chunk~html-minifier" */
      /* webpackMode: "lazy" */
      'html-minifier'
    )
      .then(importModule => {
        console.log('LOG importModule'.yellow, importModule)
        const { minify } = importModule

        const minifiedMarkup = minify(pageMarkup, {
          minifyCSS: true
        })

        console.log('LOG minifiedMarkup'.yellow, minifiedMarkup)

        const htmlRes = buildHtmlRes(minifiedMarkup)

        console.log('LOG htmlRes'.yellow, htmlRes)

        return callback(null, htmlRes)
      })
      .catch(error => {
        console.error('ERROR catch error'.yellow, error)
        throw error
      })
  } catch (error) {
    console.error('ERROR originRequest'.yellow, error)
    return callback(error)
  }
}
