const { proxy, createServer } = require('aws-serverless-express')
const { setSamHandler } = require('@colin30/services-shared/sam')
const app = require('./app')

exports.main = setSamHandler(app, proxy, createServer)