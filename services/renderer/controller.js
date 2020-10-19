import AWS from 'aws-sdk'
import { constants, helpers } from '@cjo3/shared'

const { dynamoDbConstants } = constants
const { proxyServiceError, createHashId } = helpers

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
        domain: parsed.domain,
        path: parsed.path,
        html: parsed.html,
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

const deleteOne = async queryParams => {
  try {
    const options = {
      TableName: process.env.TABLE_NAME,
      Key: {
        domain: queryParams.domain,
        path: queryParams.path
      },
      ReturnValues: 'ALL_OLD'
    }

    const result = await docClient.delete(options).promise()

    if (
      result?.Attributes?.domain === queryParams.domain &&
      result?.Attributes?.path === queryParams.path
    ) {
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

const getAll = async queryParams => {
  if (queryParams) return getByCompositeKey(queryParams)
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

const getByCompositeKey = async keyParams => {
  try {
    const options = {
      TableName: process.env.TABLE_NAME,
      Key: {
        domain: keyParams.domain,
        path: keyParams.path
      }
    }

    const result = await docClient.get(options).promise()

    if (result?.Item)
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item)
      }
    throw Error(dynamoDbConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)
  } catch (error) {
    return proxyServiceError(error)
  }
}

const getOne = async pathParams => queryById(pathParams.id)

const updateOne = async (queryParams, eventBody) => {
  try {
    let parsed = JSON.parse(eventBody)

    const timestamp = new Date().getTime()

    const options = {
      TableName: process.env.TABLE_NAME,
      Key: {
        domain: queryParams.domain,
        path: queryParams.path
      },
      ExpressionAttributeNames: {
        '#d': 'domain',
        '#h': 'html',
        '#p': 'path',
        '#u': 'updatedAt'
      },
      ExpressionAttributeValues: {
        ':d': parsed.domain,
        ':h': parsed.html,
        ':p': parsed.path,
        ':u': timestamp
      },
      ConditionExpression: '#d = :d AND #p = :p',
      UpdateExpression: 'SET #h = :h, #u = :u',
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

const queryById = async id => {
  try {
    const options = {
      TableName: process.env.TABLE_NAME,
      IndexName: process.env.TABLE_GSI_INDEX_NAME,
      ExpressionAttributeNames: {
        '#id': 'id'
      },
      ExpressionAttributeValues: {
        ':id': id
      },
      KeyConditionExpression: '#id = :id'
    }

    const result = await docClient.query(options).promise()

    if (result?.Count > 0)
      return getByCompositeKey({
        domain: result.Items[0].domain,
        path: result.Items[0].path
      })
    throw Error(dynamoDbConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)
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
