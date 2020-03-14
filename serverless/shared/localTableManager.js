require('dotenv').config()
const AWS = require('aws-sdk')

const dynamo = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: process.env.LOCAL_HOST,
  endpoint: `http://${process.env.LOCAL_HOST}:${process.env.LOCAL_DYNAMO_PORT}`
})

const makeTable = async tableSchema => {
  try {
    const result = await dynamo.createTable(tableSchema).promise()
    console.log('PASS', result)
  } catch (error) {
    console.log('FAIL', error)
    return process.exit()
  }
}

const listTables = async tableName => {
  try {
    const result = await dynamo.listTables().promise()
    console.log('PASS', result.TableNames)
    return result.TableNames
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
    console.log('PASS', result)
  } catch (error) {
    console.log('FAIL', error)
    return process.exit()
  }
}

const deleteTables = async () => {
  try {
    const tableNames = await listTables()
    tableNames.forEach(async tableName => deleteTable(tableName))
    console.log('PASS', 'Tables deleted!')
  } catch (error) {
    console.log('FAIL', error)
    return process.exit()
  }
}

module.exports = {
  listTables,
  makeTable,
  deleteTables
}
