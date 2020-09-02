import serverless from 'serverless-http'
import app from './app'

export const catcher = serverless(app)
