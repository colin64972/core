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
