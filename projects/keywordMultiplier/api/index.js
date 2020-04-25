import controller from './controller'

export const createOne = async (event, context, callback) => {
  const slsRes = await controller.createOne(event.body)
  return callback(null, slsRes)
}
