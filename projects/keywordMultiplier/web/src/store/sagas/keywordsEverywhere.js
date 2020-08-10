import { call, put, select, take, race, delay } from 'redux-saga/effects'
import { fetchKeData, makePreOrder } from '../fetchers'
import { types } from '../types'
import { decorateKeOptions, generateNotice } from '../../App/logic'
import {
  creditsMock,
  optionsMock
} from '@colin30/shared/react/mocks/keywordMultiplier'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'
import { createHashId } from '@colin30/shared/react/helpers'

export function* getKeOptions() {
  try {
    const { countries, currencies } = yield select(state => state.kE)
    if (!countries || !currencies) {
      let result = optionsMock
      if (process.env.NODE_ENV !== 'development') {
        result = yield call(fetchKeData, Object.keys(constants.ENDPOINTS)[0])
      }
      const decoratedData = decorateKeOptions(result.data)
      return yield put({
        type: types.SET_KE_OPTIONS,
        ...decoratedData
      })
    }
    return null
  } catch (error) {}
}

export function* getKeCredits() {
  try {
    let result = creditsMock
    if (process.env.NODE_ENV !== 'development') {
      result = yield call(fetchKeData, Object.keys(constants.ENDPOINTS)[1])
    }
    const credits = result?.data.credits[0]

    if (credits < constants.LOW_CREDIT_ALERT_THRESHOLD) {
      console.warn(
        '%c low credit warning',
        'color: orange; font-size: large',
        credits
      )
    }

    yield put({
      type: types.SET_KE_CREDITS,
      credits
    })
  } catch (error) {
    console.error('%c getKeCredits', 'color: red; font-size: large', error)
  }
}

export function* orderMetrics(action) {
  // console.log('%c action', 'color: yellow; font-size: large', action)
  try {
    const orderRequest = yield select(state => state.kE.orderRequest)
    const preOrderRes = yield call(
      makePreOrder,
      orderRequest,
      action.values.country,
      action.values.currency,
      action.values.dataSource
    )

    const { client_secret } = preOrderRes

    const payload = yield call(
      action.confirmCardPaymentHandler,
      client_secret,
      {
        payment_method: {
          card: action.cardNumberElement,
          billing_details: {
            email: action.values.billingEmail || null
          }
        }
      }
    )

    if (payload.error) throw Error(payload.error)

    console.log('%c PASS', 'color: yellow; font-size: large', payload)

    // yield put({
    //   type: types.SET_KE_CREDITS,
    //   credits: returnedMetrics.credits
    // })
    // const oldTrial = yield select(state =>
    //   state.app.trials.items.find(trial => trial.id === orderRequest.trialId)
    // )
    // const updatedTrial = {
    //   ...oldTrial,
    //   volumeData: returnedMetrics.data,
    //   updatedAt: new Date().getTime(),
    //   orderId: createHashId()
    // }
    // yield put({
    //   type: types.UPDATE_TRIAL,
    //   updatedTrial
    // })
  } catch (error) {
    console.error('%c FAIL', 'color: red; font-size: large', error)
  }
  yield put({
    type: types.ADD_USER_KE_SELECTIONS,
    country: action.values.country,
    currency: action.values.currency,
    dataSource: action.values.dataSource
  })
}
