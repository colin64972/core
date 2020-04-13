require('dotenv').config()
const path = require('path')
const { readYaml, getEnvValue } = require('@colin30/shared/helpers/tableParser')

const contents = readYaml(path.resolve(__dirname, 'serverless.yaml'))

const tableProperties =
  contents[0].resources.Resources[process.env.TABLE_NAME].Properties

const tableJson = JSON.stringify(tableProperties)

const stringReplaced = tableJson.replace(/\$\{env\:(\w+)\}/gi, '$1')

const parsedTable = JSON.parse(stringReplaced)

const result = {
  ...parsedTable,
  TableName: getEnvValue(parsedTable.TableName),
  GlobalSecondaryIndexes: parsedTable.GlobalSecondaryIndexes.map(gsi => ({
    ...gsi,
    IndexName: getEnvValue(gsi.IndexName)
  }))
}

module.exports = result
