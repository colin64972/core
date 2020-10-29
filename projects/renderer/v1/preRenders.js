import colors from 'colors'
import path from 'path'
import fs from 'fs'
import { minify } from 'html-minifier'
import compileReactPage from './templates/compileReactPage.pug'
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.S3_REGION,
  sslEnabled: true
})

const uploadToCdn = async (binaryString, app, page) => {
  try {
    const params = {
      Body: binaryString,
      Bucket: process.env.CDN_BUCKET,
      Key: `${app}/assets/pre-renders/${page}.html`
    }
    const res = await s3.putObject(params).promise()
    if (!res.ETag) throw new Error('upload to cdn failed')
    return res.ETag
  } catch (error) {
    throw error
  }
}

export const buildFromPreRender = async (app, page, templateLocals) => {
  try {
    let rendersFile, preRenderedPages

    if (process.env.IS_OFFLINE) {
      const localFilePath = path.resolve(
        `../${app}/web/distPreRenders/${app}.js`
      )

      rendersFile = fs.readFileSync(localFilePath).toString()

      preRenderedPages = eval(rendersFile.toString()).preRenders
    } else {
      const s3Req = await s3
        .getObject({
          Bucket: process.env.PRERENDERS_BUCKET,
          Key: `${app}.js`
        })
        .promise()

      rendersFile = s3Req.Body.toString()

      preRenderedPages = eval(rendersFile).preRenders
    }

    const { html, css, state } = preRenderedPages[page]

    const pageContent = compileReactPage({
      ...templateLocals,
      appStyle: css,
      appMarkup: html,
      appState: state
    })

    const compressed = minify(pageContent, {
      minifyCSS: true
    })

    const etag = await uploadToCdn(compressed, app, page)

    return etag
  } catch (error) {
    console.error('ERROR buildFromPreRender'.red, error)
    throw error
  }
}
