import AWS from 'aws-sdk'

const dbOptions = {}

if (process.env.IS_LOCAL || process.env.IS_OFFLINE) {
  dbOptions.region = process.env.DYNAMO_LOCAL_REGION
  dbOptions.endpoint = `http://${process.env.LOCAL_HOST}:${process.env.DYNAMO_LOCAL_PORT}`
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
  getAll,
  createOne
}

export default controller
