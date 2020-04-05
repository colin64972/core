import controller from './controller'

export const getAll = async (event, context, callback) => {
  const slsRes = await controller.getAll()
  return callback(null, slsRes)
}
