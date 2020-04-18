import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

export const createHashId = () => {
  const hash = crypto.createHash('shake256', { outputLengh: 1 })
  hash.update(uuidv4())
  return hash.digest('hex').substr(0, 10)
}
