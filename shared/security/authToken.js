import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export const createAuthHash = secret =>
  crypto.createHmac('sha256', secret).digest('hex')

export const createAuthToken = (secret, key) => {
  const authHash = createAuthHash(secret)

  const token = jwt.sign(authHash, key)

  return token
}
