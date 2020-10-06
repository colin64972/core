import { get, post } from 'axios'
import {
  ipMock,
  createTrialMock,
  optionsMock,
  creditsMock,
  preOrderMock,
  volumeMock
} from '@colin30/shared/react/mocks/searchQueryEvaluator'
import { constants } from '@colin30/shared/raw/constants/searchQueryEvaluator'

export const fetchIpAddress = async () => {
  if (process.env.USE_MOCKS) return ipMock.data.ip
  const res = await get('https://api.ipify.org?format=json')
  return res.data.ip
}

const options = {
  headers: {
    authorization: 'secret',
    accept: 'application/json'
  }
}

export const createTrial = async payload => {
  if (process.env.USE_MOCKS) return createTrialMock
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV === 'production') {
    url = 'https://apis.bettermedia.ca/sqe'
  }
  const res = await post(`${url}/search-queries`, payload, options)
  return res
}

export const fetchKeData = async resource => {
  if (process.env.USE_MOCKS) {
    switch (resource) {
      case Object.keys(constants.ENDPOINTS)[1]:
        return creditsMock
      default:
        return optionsMock
    }
  }
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV === 'production') {
    url = 'https://apis.bettermedia.ca/sqe'
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
  if (process.env.USE_MOCKS) return preOrderMock
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV === 'production') {
    url = 'https://apis.bettermedia.ca/sqe'
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
  paymentId,
  country,
  currency,
  dataSource
) => {
  if (process.env.USE_MOCKS) return volumeMock
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV === 'production') {
    url = 'https://apis.bettermedia.ca/sqe'
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

  if (res.status === 200) return res.data
}

export const postLowCreditAlert = async credits => {
  let url = 'http://localhost:2000'
  if (process.env.NODE_ENV === 'production') {
    url = 'https://apis.bettermedia.ca/sqe'
  }
  const res = await post(`${url}/ke/low-credits`, { credits }, options)
  if (res.status === 202) return true
  return false
}
