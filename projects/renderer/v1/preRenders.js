import colors from 'colors'
import path from 'path'
import fs from 'fs'
import { minify } from 'html-minifier'
import compileReactPage from './templates/compileReactPage.pug'
import { fetchPreRendersFile } from '@cjo3/shared/serverless/fetchers'
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.S3_REGION,
  sslEnabled: true
})

const uploadToCdn = async (binaryString, subFolder, pagePath) => {
  try {
    const params = {
      Body: binaryString,
      Bucket: process.env.CDN_BUCKET,
      Key: `${subFolder}/assets/pre-renders/${pagePath}.html`
    }
    const res = await s3.putObject(params).promise()
    if (!res.ETag) throw new Error('upload to cdn failed')
    return res.ETag
  } catch (error) {
    throw error
  }
}

// const writeToTemp = (fileName, data) =>
//   new Promise((resolve, reject) => {
//     const bufferData = new Uint8Array(Buffer.from(data))
//     const dirName = fs.mkdtemp('my-temp-', (error, dirName) => {
//       if (error) return reject(error)
//       const savePath = `${dirName}/${fileName}`
//       fs.writeFile(savePath, bufferData, error => {
//         if (error) return reject(error)
//         return resolve(savePath)
//       })
//     })
//     console.log('dirName'.yellow, dirName)
//   })

export const buildFromPreRender = async (appDir, pagePath, templateLocals) => {
  try {
    let rendersFile, preRenderedPages

    if (process.env.IS_OFFLINE) {
      const localFilePath = path.resolve(
        `../${appDir}/web/distPreRenders/index.js`
      )

      rendersFile = fs.readFileSync(localFilePath).toString()

      preRenderedPages = eval(rendersFile.toString()).preRenders
    } else {
      rendersFile = await fetchPreRendersFile(appDir)

      preRenderedPages = eval(rendersFile).preRenders
    }

    const { html, css, state } = preRenderedPages[pagePath]

    const pageContent = compileReactPage({
      ...templateLocals,
      appStyle: css,
      appMarkup: html,
      appState: state
    })

    const compressed = minify(pageContent, {
      minifyCSS: true
    })

    // const tempPath = await writeToTemp(
    //   `${appDir}-${pagePath.replace('/', 'root')}.html`,
    //   compressed
    // )

    const etag = await uploadToCdn(
      compressed,
      appDir,
      pagePath.replace('/', 'root')
    )

    return etag
  } catch (error) {
    console.error('ERROR buildFromPreRender'.red, error)
    throw error
  }
}
