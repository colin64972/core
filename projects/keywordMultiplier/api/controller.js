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

export default {
  createOne
}
