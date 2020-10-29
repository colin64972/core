import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { buildFromPreRender } from './preRenders'

export const generateAppPageHandler = middy(
  async (event, context, callback) => {
    let res = {}

    try {
      const { body } = event

      const uploadPassEtag = await buildFromPreRender(
        body.app,
        body.pagePath.replace('root', '/'),
        body.templateLocals
      )

      res = {
        statusCode: 200,
        body: uploadPassEtag
      }
    } catch (error) {
      res = {
        statusCode: 500,
        body: JSON.stringify(error.message, null, 2)
      }
    } finally {
      return callback(null, res)
    }
  }
).use(jsonBodyParser())
