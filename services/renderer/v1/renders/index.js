import AWS from 'aws-sdk'
import { createElement } from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { dynamoDbConstants } from '@cjo3/shared/raw/constants/dynamoDb'
import { getNodeBundleFile } from '@cjo3/shared/serverless/helpers'

const dbOptions = {
  dynamodb: '2012-08-10'
}

if (process.env.IS_LOCAL || process.env.IS_OFFLINE) {
  dbOptions.region = dynamoDbConstants.LOCAL.REGION
  dbOptions.endpoint = dynamoDbConstants.LOCAL.ENDPOINT
}

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION,
  sslEnabled: true
})

const docClient = new AWS.DynamoDB.DocumentClient(dbOptions)

export const createRender = async eventBody => {
  try {
    const { app, path } = eventBody

    // const bucketContents = await s3
    //   .listObjectsV2({
    //     Bucket: process.env.CDN_BUCKET_NAME,
    //     Prefix: `${app}/node`
    //   })
    //   .promise()

    // console.log('bucketContents', bucketContents)

    let appCode, themeCode

    appCode = await getNodeBundleFile(process.env.NODE_ENV, app, 'App')
    themeCode = await getNodeBundleFile(process.env.NODE_ENV, app, 'theme')

    console.log('XXX', appCode, themeCode)

    // const AppWithRouter = createElement(
    //   StaticRouter,
    //   {
    //     location: '/',
    //     context: {}
    //   },
    //   createElement(App)
    // )

    // const markup = ReactDOMServer.renderToString(AppWithRouter)
    // console.log('markup', markup)

    // const timestamp = new Date().getTime()

    // const options = {
    //   TableName: process.env.RENDERS_TABLE_NAME,
    //   Item: {
    //     app,
    //     path,
    //     createdAt: timestamp,
    //     updatedAt: timestamp
    //   }
    // }

    // await docClient.put(options).promise()

    // return {
    //   statusCode: 201,
    //   body: JSON.stringify(options.Item)
    // }
  } catch (error) {
    console.error('createRender', error)
  }
}

export const getRenders = async () => {
  try {
    const params = {
      TableName: process.env.RENDERS_TABLE_NAME
    }

    const result = await docClient.scan(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    }
  } catch (error) {
    console.error('getRenders', error)
    return {
      statusCode: 500,
      body: JSON.stringify(error, null, 2)
    }
  }
}
