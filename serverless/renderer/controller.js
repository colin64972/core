import AWS from 'aws-sdk'

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

const queryFor = async queryParams => {
  let response

  try {
    const { domain, path } = queryParams
  } catch (error) {
    response = serviceError(error)
  }

  return response
}

const getOne = async (pathParam, queryParams) => {
  if (queryParams?.domain && queryParams?.path) return queryFor(queryParams)

  let response

  try {
    const result = await docClient
      .get({
        TableName: process.env.RENDERS_TABLE_NAME,
        Key: {
          id: pathParam?.id
        }
      })
      .promise()
    if (result?.Item) {
      response = {
        statusCode: 200,
        body: JSON.stringify(result.Item)
      }
    } else {
      throw Error('no doc')
    }
  } catch (error) {
    console.log('DYNAMO ERROR', error.name, error.message)
    if (error.message === 'no doc') {
      response = {
        statusCode: 400,
        body: JSON.stringify('no item')
      }
    } else {
      response = serviceError(error)
    }
  }

  return response
}

const createOne = async (eventBody, requestId) => {
  let response

  try {
    let { page } = eventBody

    if (!process.env.IS_LOCAL) {
      page = JSON.parse(eventBody).page
    }

    const timestamp = new Date().getTime()

    const postItem = {
      id: requestId,
      page,
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

const controller = {
  createOne,
  getAll,
  getOne
}

export default controller
