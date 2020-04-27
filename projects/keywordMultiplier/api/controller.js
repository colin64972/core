import AWS from 'aws-sdk'
import { constants, helpers } from '@colin30/shared'

const { dynamoDbConstants } = constants
const { createHashId } = helpers

const dbOptions = {}

if (process.env.IS_LOCAL || process.env.IS_OFFLINE) {
  dbOptions.region = dynamoDbConstants.LOCAL.REGION
  dbOptions.endpoint = dynamoDbConstants.LOCAL.ENDPOINT
}

const docClient = new AWS.DynamoDB.DocumentClient(dbOptions)

const createOne = async eventBody => {
  try {
    let parsed = JSON.parse(eventBody)

    const timestamp = new Date().getTime()

    const options = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: createHashId(),
        ipAddress: parsed.ipAddress,
        sets: parsed.sets,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    }

    await docClient.put(options).promise()

    return {
      statusCode: 201,
      body: JSON.stringify(options.Item)
    }
  } catch (error) {
    return proxyServerError(error)
  }
}

const getAll = async () => {
  try {
    const result = await docClient
      .scan({
        TableName: process.env.TABLE_NAME
      })
      .promise()
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    }
  } catch (error) {
    return proxyServiceError(error)
  }
}

const getOne = async pathParams => {
  try {
    const result = await docClient
      .get({
        TableName: process.env.TABLE_NAME,
        Key: { id: pathParams.id }
      })
      .promise()
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
  } catch (error) {
    return proxyServiceError(error)
  }
}

export default {
  createOne,
  getAll,
  getOne
}
