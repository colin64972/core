require('dotenv').config()
const path = require('path')
const { helpers } = require('@colin30/shared')

const { readYaml, getEnvValue } = helpers.dynamoTableManager

const parsedTable = JSON.parse(
  JSON.stringify(
    readYaml(path.resolve(__dirname, 'serverless.yaml'))[0].resources.Resources[
      process.env.TABLE_NAME
    ].Properties
  ).replace(/\$\{env\:(\w+)\}/gi, '$1')
)

module.exports = {
  ...parsedTable,
  TableName: getEnvValue(parsedTable.TableName)
}
