import { createOne } from './trials'
import { getOptions } from './keywordsEverywhere'

export const postTrial = async (event, context, callback) => {
  const slsRes = await createOne(event.body)
  return callback(null, slsRes)
}

export const optionsRequest = async (event, context, callback) => {
  const slsRes = await getOptions()
  return callback(null, slsRes)
}
