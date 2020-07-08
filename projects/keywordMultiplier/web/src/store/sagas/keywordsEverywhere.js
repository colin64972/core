import { call, put, select } from 'redux-saga/effects'
import { fetchKeData } from '../fetchers'
import { types } from '../types'
import { decorateKeOptions } from '../../App/logic'
import {
  creditsMock,
  optionsMock
} from '@colin30/shared/raw/mocks/keywordMultiplier'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'

export function* getKeOptions() {
  try {
    const { countries, currencies } = yield select(state => state.kE)
    if (!countries || !currencies) {
      let result = optionsMock
      // if (process.env.NODE_ENV !== 'development') {
      result = yield call(fetchKeData, Object.keys(constants.ENDPOINTS)[0])
      // }
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
    // if (process.env.NODE_ENV !== 'development') {
    result = yield call(fetchKeData, Object.keys(constants.ENDPOINTS)[1])
    // }
    const credits = result?.data.credits[0]

    if (credits < constants.LOW_CREDIT_ALERT_THRESHOLD) {
      console.error(
        '%c low credit warning',
        'color: red; font-size: large',
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

export function* alertInsufficientKeCredits() {
  console.log(
    '%c alertInsufficientKeCredits',
    'color: orange; font-size: large'
  )
}
