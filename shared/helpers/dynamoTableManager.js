const AWS = require('aws-sdk')
const setDynamoConstants = require('@colin30/shared/constants/dynamodb')

const dynamoConstants = setDynamoConstants()

const dynamo = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: dynamoConstants.LOCAL.REGION,
  endpoint: dynamoConstants.LOCAL.ENDPOINT
})

const createTable = async tableSchema => {
  try {
    const result = await dynamo.createTable(tableSchema).promise()
    console.log('Created Table:', result)
  } catch (error) {
    console.log('FAIL', error)
    return process.exit()
  }
}

const deleteTable = async tableName => {
  try {
    const result = await dynamo
      .deleteTable({
        TableName: tableName
      })
      .promise()
    console.log('Deleted Table:', result)
  } catch (error) {
    console.log('FAIL', error)
    return process.exit()
  }
}

const listTables = async tableName => {
  try {
    const result = await dynamo.listTables().promise()
    console.log('Listed Tables:', result.TableNames)
    return result.TableNames
  } catch (error) {
    console.log('FAIL', error)
    return process.exit()
  }
}

module.exports = {
  createTable,
  deleteTable,
  listTables
}
