import { get, post } from 'axios'
import { createAuthToken } from '@cjo3/shared/security/authToken'

export const fetchIpAddress = async () => {
  const res = await get('https://api.ipify.org?format=json')
  return res.data.ip
}

const otherHeaders = {
  headers: {
    accept: 'application/json'
  }
}

const addAuthHeaderToOptions = options => ({
  headers: {
    ...options.headers,
    authorization: createAuthToken(
      process.env.AUTH_SECRET,
      process.env.JWT_PRIVATE_KEY
    )
  }
})

export const createTrial = async payload => {
  const res = await post(
    `${process.env.API_URL}/trials`,
    payload,
    addAuthHeaderToOptions(otherHeaders)
  )
  return res
}

export const fetchKeData = async resource => {
  const res = await get(
    `${process.env.API_URL}/ke?resource=${resource}`,
    addAuthHeaderToOptions(otherHeaders)
  )
  return res
}

export const makePreOrder = async (
  orderRequest,
  country,
  currency,
  dataSource,
  readableKeOptions
) => {
  const res = await post(
    `${process.env.API_URL}/ke/pre-order`,
    {
      orderRequest,
      country,
      currency,
      dataSource,
      readableKeOptions
    },
    addAuthHeaderToOptions(otherHeaders)
  )
  return res.data
}

export const fetchKeVolumes = async (
  trialId,
  paymentId,
  country,
  currency,
  dataSource
) => {
  const res = await post(
    `${process.env.API_URL}/ke`,
    {
      trialId,
      paymentId,
      country,
      currency,
      dataSource
    },
    addAuthHeaderToOptions(otherHeaders)
  )

  if (res.status === 200) return res.data
}

export const postLowCreditAlert = async credits => {
  const res = await post(
    `${process.env.API_URL}/ke/low-credits`,
    { credits },
    addAuthHeaderToOptions(otherHeaders)
  )
  if (res.status === 202) return true
  return false
}
