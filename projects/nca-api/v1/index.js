import 'colors'
import { authMiddlware } from './middleware'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { sendMessage } from './messages'
import { postContent, getContent } from './content'

export const contentHandler = middy(async (event, context, callback) => {
  const { httpMethod } = event
  if (httpMethod === 'POST') return await postContent(event.body)
  if (httpMethod === 'GET') {
    const { path } = event.queryStringParameters
    return await getContent(path)
  }
})
  .use(authMiddlware())
  .use(jsonBodyParser())

export const contactHandler = middy(async (event, context, callback) => {
  try {
    return await sendMessage(event.body)
  } catch (error) {
    console.error('ERROR contactHandler'.red, error)
    return callback(error)
  }
})
  .use(authMiddlware())
  .use(jsonBodyParser())
