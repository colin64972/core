import { get, post } from 'axios'
import {
  ipMock,
  createTrialMock,
  optionsMock,
  creditsMock,
  preOrderMock,
  volumeMock
} from '@colin30/shared/react/mocks/keywordMultiplier'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'

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
  if (process.env.NODE_ENV === 'development') return createTrialMock
  let url = 'http://localhost:2000'
  const res = await post(`${url}/trials`, payload, options)
  return res
}

export const fetchKeData = async resource => {
  if (process.env.NODE_ENV === 'development') {
    switch (resource) {
      case Object.keys(constants.ENDPOINTS)[1]:
        return creditsMock
      default:
        return optionsMock
    }
  }
  let url = 'http://localhost:2000'
  const res = await get(`${url}/ke?resource=${resource}`, options)
  return res
}

export const makePreOrder = async (
  orderRequest,
  country,
  currency,
  dataSource
) => {
  if (process.env.NODE_ENV === 'development') return preOrderMock
  let url = 'http://localhost:2000'
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
  if (process.env.NODE_ENV === 'development') return volumeMock
  let url = 'http://localhost:2000'
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
