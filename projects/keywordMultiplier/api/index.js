import { createOne } from './trials'
import { fetchKeMeta } from './keywordsEverywhere'

export const postTrial = async (event, context, callback) => {
  const slsRes = await createOne(event.body)
  return callback(null, slsRes)
}

export const getMeta = async (event, context, callback) => {
  const slsRes = await fetchKeMeta()
  return callback(null, slsRes)
}
