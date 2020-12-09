import { isAuthorized } from '@cjo3/shared/security/authToken'

export function authMiddlware() {
  return {
    before: (handler, next) => {
      const {
        event: { headers }
      } = handler
      const status = isAuthorized(
        headers?.authorization,
        process.env.JWT_PRIVATE_KEY,
        process.env.AUTH_SECRET
      )
      if (status) return next()
      return handler.callback(null, {
        statusCode: 401
      })
    },
    after: (handler, next) => next()
  }
}
