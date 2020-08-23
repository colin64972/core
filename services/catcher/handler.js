const serverless = require('serverless-http')
const app = require('./app')

module.exports.catcher = serverless(app)
