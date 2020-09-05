import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import setDynamoConstants from '@colin30/shared/constants/dynamodb'

const dynamoConstants = setDynamoConstants()

const dbOptions = {}

if (process.env.IS_LOCAL || process.env.IS_OFFLINE) {
  dbOptions.region = dynamoConstants.LOCAL.REGION
  dbOptions.endpoint = dynamoConstants.LOCAL.ENDPOINT
}

const docClient = new AWS.DynamoDB.DocumentClient(dbOptions)

const serviceError = error => ({
  statusCode: 500,
  body: JSON.stringify({
    name: 'service error',
    error
  })
})

const createOne = async eventBody => {
  let response, body

  try {
    body = eventBody

    if (process.env.IS_OFFLINE) {
      const parsed = JSON.parse(eventBody)
      body = {
        ...parsed
      }
    }

    const timestamp = new Date().getTime()

    const options = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: uuidv4(),
        domain: body.domain,
        path: body.path,
        content: body.content,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    }

    await docClient.put(options).promise()

    response = {
      statusCode: 201,
      body: JSON.stringify(options.Item)
    }
  } catch (error) {
    console.log('DYNAMO ERROR', error.message)
    response = serviceError(error)
  }
  return response
}

const deleteOne = async queryParams => {
  let response

  try {
    const { domain, path } = queryParams

    if (!domain || !path)
      throw Error(dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)

    const options = {
      TableName: process.env.TABLE_NAME,
      Key: {
        domain,
        path
      },
      ReturnValues: 'ALL_OLD'
    }

    const result = await docClient.delete(options).promise()

    if (
      result?.Attributes?.domain === domain &&
      result?.Attributes?.path === path
    ) {
      response = {
        statusCode: 204
      }
    } else {
      throw Error(dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)
    }
  } catch (error) {
    switch (error.message) {
      case dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE:
        response = {
          statusCode: dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.STATUS_CODE,
          body: JSON.stringify(dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.MESSAGE)
        }
        break
      default:
        response = serviceError(error)
        break
    }
  }

  return response
}

const getAll = async () => {
  let response
  try {
    const result = await docClient
      .scan({
        TableName: process.env.TABLE_NAME
      })
      .promise()
    response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    }
  } catch (error) {
    console.log('DYNAMO ERROR', error.message)
    response = serviceError(error)
  }
  return response
}

const getByPrimaryKey = async queryParams => {
  let response

  try {
    const { domain, path } = queryParams

    const options = {
      TableName: process.env.TABLE_NAME,
      Key: {
        domain,
        path
      }
    }

    const result = await docClient.get(options).promise()

    if (result?.Item) {
      response = {
        statusCode: 200,
        body: JSON.stringify(result.Item)
      }
    } else {
      throw Error(dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)
    }
  } catch (error) {
    switch (error.message) {
      case dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE:
        response = {
          statusCode: dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.STATUS_CODE,
          body: JSON.stringify(dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.MESSAGE)
        }
        break
      default:
        response = serviceError(error)
        break
    }
  }

  return response
}

const getOne = async (pathParam, queryParams) => {
  if (queryParams?.domain && queryParams?.path)
    return getByPrimaryKey(queryParams)
  return queryBySecondaryIndex(pathParam.id)
}

const updateOne = async (queryParams, eventBody) => {
  let response, update

  try {
    const { domain, path } = queryParams

    update = {
      ...eventBody
    }

    if (process.env.IS_OFFLINE) {
      const parsed = JSON.parse(eventBody)
      update = {
        ...parsed
      }
    }

    if (!domain || !path)
      throw Error(dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)

    const timestamp = new Date().getTime()

    const options = {
      TableName: process.env.TABLE_NAME,
      Key: {
        domain,
        path
      },
      ExpressionAttributeNames: {
        '#c': 'content',
        '#u': 'updatedAt'
      },
      ExpressionAttributeValues: {
        ':c': update.content,
        ':u': timestamp
      },
      UpdateExpression: 'SET #c = :c, #u = :u',
      ReturnValues: 'UPDATED_NEW'
    }

    const result = await docClient.update(options).promise()

    if (result?.Attributes.updatedAt === timestamp) {
      response = {
        statusCode: 204
      }
    } else {
      throw Error(dynamoConstants.ERRORS.DYNAMODB.UPDATE_FAIL.ERROR_CODE)
    }
  } catch (error) {
    switch (error.message) {
      case dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE:
        response = {
          statusCode: dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.STATUS_CODE,
          body: JSON.stringify(dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.MESSAGE)
        }
        break
      case dynamoConstants.ERRORS.DYNAMODB.UPDATE_FAIL.ERROR_CODE:
        response = {
          statusCode: dynamoConstants.ERRORS.DYNAMODB.UPDATE_FAIL.STATUS_CODE,
          body: JSON.stringify(
            dynamoConstants.ERRORS.DYNAMODB.UPDATE_FAIL.MESSAGE
          )
        }
        break
      default:
        response = serviceError(error)
        break
    }
  }

  return response
}

const queryBySecondaryIndex = async id => {
  let response

  try {
    const options = {
      TableName: process.env.TABLE_NAME,
      IndexName: process.env.TABLE_GLOBAL_SECONDARY_INDEX_NAME,
      ExpressionAttributeValues: {
        ':id': id
      },
      KeyConditionExpression: 'id = :id'
    }

    const result = await docClient.query(options).promise()

    if (result?.Count > 0)
      return getByPrimaryKey({
        domain: result.Items[0].domain,
        path: result.Items[0].path
      })
    throw Error(dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)
  } catch (error) {
    switch (error.message) {
      case dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE:
        response = {
          statusCode: dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.STATUS_CODE,
          body: JSON.stringify(dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.MESSAGE)
        }
        break
      default:
        response = serviceError(error)
        break
    }
  }

  return response
}

export default {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne
}
