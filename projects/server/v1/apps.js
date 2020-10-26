// import AWS from 'aws-sdk'
import App from './templates/app.pug'

// const s3 = new AWS.S3({
//   apiVersion: '2006-03-01',
//   region: process.env.REGION,
//   sslEnabled: true
// })

export const renderAppPage = async (appName, appPath) => {
  try {
    // const data = await s3
    //   .listObjectsV2({
    //     Bucket: process.env.CDN_BUCKET_NAME,
    //     Prefix: requestedApp
    //   })
    //   .promise()
    // const appFile = await s3
    //   .getObject({
    //     Bucket: process.env.CDN_BUCKET_NAME,
    //     Key: `${requestedApp}/node/app.js`
    //   })
    //   .promise()
    // console.log('appFile', appFile)
    const locals = {
      title: `Keyword Multiplier by ${process.env.HOME_TITLE}`,
      iconSrc: `${process.env.CDN_URL}/favicon.ico`,
      styleSrc: `${process.env.CDN_URL}/style.css`,
      bundles: [
        `${process.env.CDN_URL}/${appName}/src.js`,
        `${process.env.CDN_URL}/${appName}/vendors~src.js`
      ]
    }
    const html = App(locals)
    return html
  } catch (error) {
    console.error(error)
  }
}
