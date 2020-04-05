import AWS from 'aws-sdk'
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

export default {
  getAll
}
