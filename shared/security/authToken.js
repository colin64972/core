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

export const checkAuthorization = (jwtToken, jwtKey, authSecret, callback) => {
  if (!jwtToken) return callback(null, res)

  let res = {
    statusCode: 401
  }

  try {
    const decoded = jwt.verify(jwtToken.substring(7), jwtKey)
    const envSecret = createAuthHash(authSecret)
    if (decoded.secret !== envSecret) return callback(null, res)
  } catch (error) {
    return callback(null, res)
  }
}
