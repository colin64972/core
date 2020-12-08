import crypto from 'crypto'

import jwt from 'jsonwebtoken'

export const createAuthHash = content =>
  crypto.createHmac('sha256', content).digest('hex')

export const createAuthToken = (payloadSecret, jwtSecret) => {
  const payload = {
    secret: createAuthHash(payloadSecret)
  }

  const token = jwt.sign(payload, jwtSecret, { expiresIn: 30 })

  return `Bearer ${token}`
}

export function isAuthorized(token, jwtKey, authSecret) {
  if (!token) return false
  const decoded = jwt.verify(token.substring(7), jwtKey)
  const envSecret = createAuthHash(authSecret)
  return decoded.secret === envSecret
}

export const checkAuthorization = (jwtToken, jwtKey, authSecret, callback) => {
  let res = {
    statusCode: 401
  }

  if (!jwtToken) return callback(null, res)

  try {
    const decoded = jwt.verify(jwtToken.substring(7), jwtKey)
    const envSecret = createAuthHash(authSecret)
    if (decoded.secret !== envSecret) return callback(null, res)
  } catch (error) {
    return callback(null, res)
  }
}

export const addAuthHeaderToOptions = options => ({
  headers: {
    ...options.headers,
    authorization: createAuthToken(
      process.env.AUTH_SECRET,
      process.env.JWT_PRIVATE_KEY
    )
  }
})
