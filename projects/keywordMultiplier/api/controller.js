import AWS from 'aws-sdk'
import { dynamoDbConstants } from '@colin30/shared/raw/constants/dynamoDb'
import { proxyServiceError } from '@colin30/shared/serverless/proxyServiceError'
import { createHashId } from '@colin30/shared/react/helpers'

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

const deleteOne = async pathParams => {
  try {
    const options = {
      TableName: process.env.TABLE_NAME,
      Key: { id: pathParams.id },
      ReturnValues: 'ALL_OLD'
    }

    const result = await docClient.delete(options).promise()

    if (result?.Attributes?.id === pathParams.id) {
      return {
        statusCode: 204
      }
    } else {
      throw Error(dynamoDbConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)
    }
  } catch (error) {
    return proxyServiceError(error)
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
    const options = {
      TableName: process.env.TABLE_NAME,
      Key: { id: pathParams.id }
    }

    const result = await docClient.get(options).promise()

    if (!result?.Item)
      throw Error(dynamoDbConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
  } catch (error) {
    return proxyServiceError(error)
  }
}

const updateOne = async (pathParams, eventBody) => {
  try {
    let parsed = JSON.parse(eventBody)

    const timestamp = new Date().getTime()

    const options = {
      TableName: process.env.TABLE_NAME,
      Key: {
        id: pathParams.id
      },
      ExpressionAttributeNames: {
        '#i': 'ipAddress',
        '#o': 'orderId',
        '#s': 'sets',
        '#u': 'updatedAt',
        '#v': 'volumes'
      },
      ExpressionAttributeValues: {
        ':i': parsed.ipAddress,
        ':o': parsed.orderId,
        ':s': parsed.sets,
        ':u': timestamp,
        ':v': parsed.volumes
      },
      ConditionExpression: '#i = :i AND #s = :s',
      UpdateExpression: 'SET #o = :o, #s = :s, #u = :u, #v = :v',
      ReturnValues: 'UPDATED_NEW'
    }

    const result = await docClient.update(options).promise()

    if (result?.Attributes.updatedAt === timestamp)
      return {
        statusCode: 204
      }
    throw Error(dynamoDbConstants.ERRORS.DYNAMODB.UPDATE_FAIL.ERROR_CODE)
  } catch (error) {
    return proxyServiceError(error)
  }
}

export default {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne
}
