import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION,
  sslEnabled: true
})

const fetchAndRenderPage = async routeKey => {
  console.log('fetchAndRenderPage', routeKey)

  try {
    const objectListRes = await s3
      .listObjectsV2({
        Bucket: process.env.CDN_BUCKET_NAME
      })
      .promise()

    const indexObject = await s3
      .getObject({
        Bucket: process.env.CDN_BUCKET_NAME,
        Key: 'index.html'
      })
      .promise()

    const html = indexObject.Body.toString()

    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/html'
      },
      body: html
    }
  } catch (error) {
    console.error('fetchAndRenderPage', 'FAIL', error)
    return {
      status: 500,
      body: JSON.stringify(error)
    }
  }
}

export const servePageHandler = async (event, context, callback) => {
  const html = await fetchAndRenderPage(event.routeKey)
  return context.succeed(html)
  return callback(null, slsRes)
}
