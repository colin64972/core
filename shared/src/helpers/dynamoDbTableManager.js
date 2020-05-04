import AWS from 'aws-sdk'
import fs from 'fs'
import yaml from 'js-yaml'
import dynamoDbConstants from '../constants/dynamoDb'

const dynamo = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: dynamoDbConstants.LOCAL.REGION,
  endpoint: dynamoDbConstants.LOCAL.ENDPOINT
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

const getEnvValue = value => process.env[value]

const readYaml = filePath => {
  try {
    const contents = fs.readFileSync(filePath, 'utf8')
    const data = yaml.safeLoadAll(contents)
    return data
  } catch (error) {
    console.error('ERROR', error)
    return process.exit()
  }
}

const dynamoDbTableManager = {
  createTable,
  deleteTable,
  listTables,
  getEnvValue,
  readYaml
}

export default dynamoDbTableManager
