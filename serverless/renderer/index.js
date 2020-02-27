import controller from './controller'

export const getAll = async (event, context, callback) => {
  const slsRes = await controller.getAll()
  return callback(null, slsRes)
}

export const createOne = async (event, context, callback) => {
  const slsRes = await controller.createOne(event.body, context.awsRequestId)
  return callback(null, slsRes)
}
