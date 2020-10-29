import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { createRender, getRenders } from './renders'

export const createRenderHandler = middy(async (event, context, callback) => {
  let slsRes = await createRender(event.body)
  return callback(null, slsRes)
}).use(jsonBodyParser())

export const getRendersHandler = async (event, context, callback) => {
  let slsRes = await getRenders()
  return callback(null, slsRes)
}
