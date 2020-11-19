import { post } from 'axios'
import { addAuthHeaderToOptions } from '@cjo3/shared/security/authToken'

const otherHeaders = {
  headers: {
    accept: 'application/json'
  }
}

export const makePreOrder = async () => {
  let apiUrl = 'http://localhost:2000'

  if (process.env.NODE_ENV === 'production')
    apiUrl = process.env.API_URL + '/detection-limit-corrector'

  const res = await post(
    `${apiUrl}/pre-order`,
    null,
    addAuthHeaderToOptions(otherHeaders)
  )
  return res.data
}
