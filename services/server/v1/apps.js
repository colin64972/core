import AWS from 'aws-sdk'
import App from './templates/app.pug'

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  // endpoint: process.env.REGION,
  region: process.env.REGION,
  sslEnabled: true
})

export const serveAppPage = async requestedApp => {
  try {
    const data = await s3
      .listObjectsV2({
        Bucket: process.env.CDN_BUCKET_NAME,
        Prefix: requestedApp
      })
      .promise()

    console.log('data', data)

    const html = App({
      title: `Keyword Multiplier by ${HOME_TITLE}`,
      iconSrc: `${process.env.CDN_URL}/favicon.ico`
    })

    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/html'
      },
      body: html
    }
  } catch (error) {}
  return {
    statusCode: 200,
    body: JSON.stringify(requestedApp)
  }
}
