const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')

exports.handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  awsServerlessExpress.proxy(
    awsServerlessExpress.createServer(app),
    event,
    context
  )
}
