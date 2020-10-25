import AWS from 'aws-sdk'
import { createElement, createContext } from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles'
import { dynamoDbConstants } from '@cjo3/shared/raw/constants/dynamoDb'
import { fetchBundleFile } from '@cjo3/shared/serverless/fetchers'

const dbOptions = {
  dynamodb: '2012-08-10'
}

if (process.env.IS_LOCAL || process.env.IS_OFFLINE) {
  dbOptions.region = dynamoDbConstants.LOCAL.REGION
  dbOptions.endpoint = dynamoDbConstants.LOCAL.ENDPOINT
}

const docClient = new AWS.DynamoDB.DocumentClient(dbOptions)

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION,
  sslEnabled: true
})

export const createRender = async eventBody => {
  try {
    const { app, path } = eventBody

    let appCode, themeCode, storeCode, renderRootCode

    if (process.env.IS_OFFLINE) {
      renderRootCode = await fetchBundleFile('setRenderRoot')
      // appCode = await fetchBundleFile('App')
      // themeCode = await fetchBundleFile('theme')
      // storeCode = await fetchBundleFile('store')
    } else {
      const appFile = await s3
        .getObject({
          Bucket: process.env.CDN_BUCKET,
          Key: `${app}/node/app.js`
        })
        .promise()

      const themeFile = await s3
        .getObject({
          Bucket: process.env.CDN_BUCKET,
          Key: `${app}/node/theme.js`
        })
        .promise()

      const storeFile = await s3
        .getObject({
          Bucket: process.env.CDN_BUCKET,
          Key: `${app}/node/theme.js`
        })
        .promise()

      appCode = appFile.Body.toString()
      themeCode = themeFile.Body.toString()
      storeCode = storeFile.Body.toString()
    }

    const sheets = new ServerStyleSheets()

    // const store = eval(storeCode).setStore()

    // const AppWithStore = createElement(
    //   Provider,
    //   { store, context: createContext({ asdf: true }) },
    //   createElement(
    //     ThemeProvider,
    //     { theme: eval(themeCode).theme },
    //     createElement(eval(appCode).App, { reqPath: path })
    //   )
    // )

    // const markup = renderToString(eval(renderRootCode).setRenderRoot())

    // sheets.collect(markup)

    // const css = sheets.toString()

    console.log('markup', eval(renderRootCode).setRenderRoot())

    // const markup = renderToString(
    //   createElement(eval(appCode).App, { reqPath: path })
    // )

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
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    }
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
