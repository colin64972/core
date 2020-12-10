import { dynamoDbConstants } from '@cjo3/shared/raw/constants/dynamoDb'
import { splitEnvVarList } from '@cjo3/shared/serverless/helpers'
import { DynamoDB } from 'aws-sdk'

const appsList = splitEnvVarList(process.env.APPS_LIST)

const dbOptions = {
  apiVersion: '2012-08-10',
  region: process.env.REGION
}

if (process.env.IS_LOCAL || process.env.IS_OFFLINE) {
  dbOptions.region = dynamoDbConstants.LOCAL.REGION
  dbOptions.endpoint = dynamoDbConstants.LOCAL.ENDPOINT
}

const docClient = new DynamoDB.DocumentClient(dbOptions)

export async function postContent(payload) {
  try {
    const timestamp = new Date().getTime()

    const options = {
      TableName: process.env.TABLE_NAME,
      Item: {
        ...payload,
        createdAt: timestamp,
        updatedAt: timestamp
      },
      ReturnValues: 'ALL_OLD'
    }

    const { Attributes } = await docClient.put(options).promise()

    if (Attributes)
      return {
        statusCode: 204
      }

    throw new Error('post fail')
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    }
  }
}

export async function getContent(path) {
  try {
    let app = appsList.find(app => path.includes(app))
    if (!app) app = appsList[0]

    const options = {
      TableName: process.env.TABLE_NAME,
      Key: {
        app,
        path
      }
    }

    const result = await docClient.get(options).promise()
    console.log('LOG XXX'.yellow, result)
    if (result.Item)
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item)
      }

    throw new Error('no such item')
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message)
    }
  }
}
