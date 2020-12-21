import 'colors'
import { authMiddlware } from './middleware'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { sendMessage } from './messages'
import { checkToken } from './recaptcha'

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

export const recaptchaHandler = middy(async (event, context, callback) => {
  try {
    return await checkToken(event.body.token, event.body.ip)
  } catch (error) {
    console.error('ERROR contactHandler'.red, error)
    return callback(error)
  }
})
  .use(authMiddlware())
  .use(jsonBodyParser())
