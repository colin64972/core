import 'regenerator-runtime/runtime'
import { get, post } from 'axios'
import { createAuthToken } from '@cjo3/shared/security/authToken'

const otherHeaders = {
  headers: {
    accept: 'application/json'
  }
}

export async function postMessage(values, host, pathname) {
  const res = await post(
    'http://localhost:2000/contact',
    { ...values, host, pathname },
    otherHeaders
  )
  return res
}
