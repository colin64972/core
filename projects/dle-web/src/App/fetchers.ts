import { addAuthHeaderToOptions } from '@cjo3/shared/security/authToken'
import post from 'axios'

const otherHeaders = {
  headers: {
    accept: 'application/json'
  }
}

export const makePreOrder = async (email: string) => {
  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? `${process.env.API_URL}/${process.env.CDN_APP_FOLDER}`
      : 'http://localhost:2000'

  const res = await post(
    `${apiUrl}/payment`,
    { email },
    addAuthHeaderToOptions(otherHeaders)
  )
  return res.data
}
