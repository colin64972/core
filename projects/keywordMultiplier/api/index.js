import controller from './controller'

export const createOne = async (event, context, callback) => {
  const slsRes = await controller.createOne(event.body)
  return callback(null, slsRes)
}

export const deleteOne = async (event, context, callback) => {
  const slsRes = await controller.deleteOne(event.pathParameters)
  return callback(null, slsRes)
}

export const getAll = async (event, context, callback) => {
  const slsRes = await controller.getAll(event.queryStringParameters)
  return callback(null, slsRes)
}

export const getOne = async (event, context, callback) => {
  const slsRes = await controller.getOne(event.pathParameters)
  return callback(null, slsRes)
}
