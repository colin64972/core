import { addAuthHeaderToOptions } from '@cjo3/shared/security/authToken'
import { post } from 'axios'

const otherHeaders = {
  headers: {
    accept: 'application/json'
  }
}

export const makePreOrder = async (email: string) => {
  let apiUrl = 'http://localhost:2000'

  if (process.env.NODE_ENV === 'production')
    apiUrl = `${process.env.API_URL}/${process.env.CDN_APP_FOLDER}`

  const res = await post(
    `${apiUrl}/pre-order`,
    { email },
    addAuthHeaderToOptions(otherHeaders)
  )
  return res.data
}
