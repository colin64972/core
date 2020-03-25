import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import constants from '@colin30/serverless-shared/constants'

const dbOptions = {}

if (process.env.IS_LOCAL || process.env.IS_OFFLINE) {
  dbOptions.region = process.env.LOCAL_HOST
  dbOptions.endpoint = `http://${process.env.LOCAL_HOST}:${process.env.LOCAL_DYNAMO_PORT}`
}

const docClient = new AWS.DynamoDB.DocumentClient(dbOptions)

const serviceError = error => ({
  statusCode: 500,
  body: JSON.stringify({
    name: 'service error',
    error
  })
})

const createOne = async (eventBody, requestId) => {
  let response, body

  try {
    let { domain, path, content } = eventBody

    if (process.env.IS_OFFLINE) {
      body = JSON.parse(eventBody)
      domain = body.domain
      path = body.path
      content = body.content
    }

    const timestamp = new Date().getTime()

    const postItem = {
      id: uuidv4(),
      domain,
      path,
      content,
      createdAt: timestamp,
      updatedAt: timestamp
    }

    const createData = {
      TableName: process.env.RENDERS_TABLE_NAME,
      Item: postItem
    }

    await docClient.put(createData).promise()

    response = {
      statusCode: 201,
      body: JSON.stringify(postItem)
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

    const options = {
      TableName: process.env.RENDERS_TABLE_NAME,
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
      throw Error(constants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)
    }
  } catch (error) {
    switch (error.message) {
      case constants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE:
        response = {
          statusCode: constants.ERRORS.DYNAMODB.NO_ITEMS.STATUS_CODE,
          body: JSON.stringify(constants.ERRORS.DYNAMODB.NO_ITEMS.MESSAGE)
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
        TableName: process.env.RENDERS_TABLE_NAME
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
      TableName: process.env.RENDERS_TABLE_NAME,
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
      throw Error(constants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)
    }
  } catch (error) {
    switch (error.message) {
      case constants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE:
        response = {
          statusCode: constants.ERRORS.DYNAMODB.NO_ITEMS.STATUS_CODE,
          body: JSON.stringify(constants.ERRORS.DYNAMODB.NO_ITEMS.MESSAGE)
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

const queryBySecondaryIndex = async id => {
  let response

  try {
    const options = {
      TableName: process.env.RENDERS_TABLE_NAME,
      IndexName: process.env.RENDERS_TABLE_GLOBAL_SECONDARY_INDEX_NAME,
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
    throw Error(constants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)
  } catch (error) {
    switch (error.message) {
      case constants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE:
        response = {
          statusCode: constants.ERRORS.DYNAMODB.NO_ITEMS.STATUS_CODE,
          body: JSON.stringify(constants.ERRORS.DYNAMODB.NO_ITEMS.MESSAGE)
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
  getOne
}
