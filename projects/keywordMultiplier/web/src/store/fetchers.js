import { get, post } from 'axios'
import { ipMock } from '@colin30/shared/react/mocks/keywordMultiplier'

export const fetchIpAddress = async () => {
  if (process.env.NODE_ENV === 'development') return ipMock.data.ip
  const res = await get('https://api.ipify.org?format=json')
  return res.data.ip
}

const options = {
  headers: {
    Authorization: 'secret',
    Accept: 'application/json'
  }
}

export const createTrial = async payload => {
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV !== 'development') {
    url = 'https://apis.colin30.com/keyword-multiplier'
  }
  const res = await post(`${url}/trials`, payload, options)
  return res
}

export const fetchKeData = async resource => {
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV !== 'development') {
    url = 'https://apis.colin30.com/keyword-multiplier'
  }
  const res = await get(`${url}/ke?resource=${resource}`, options)
  return res
}

export const makePreOrder = async (
  orderRequest,
  country,
  currency,
  dataSource
) => {
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV !== 'development') {
    url = 'https://apis.colin30.com/keyword-multiplier'
  }
  const res = await post(
    `${url}/ke/pre-order`,
    {
      orderRequest,
      country,
      currency,
      dataSource
    },
    options
  )
  return res.data
}

export const fetchKeVolumes = async (
  trialId,
  country,
  currency,
  dataSource,
  paymentId
) => {
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV !== 'development') {
    url = 'https://apis.colin30.com/keyword-multiplier'
  }
  const res = await post(
    `${url}/ke`,
    {
      trialId,
      paymentId,
      country,
      currency,
      dataSource
    },
    options
  )
  console.log('%c fetchKeVolumes', 'color: yellow; font-size: large', res)
}
