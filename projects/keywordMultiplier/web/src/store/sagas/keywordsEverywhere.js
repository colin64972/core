import { call, put, select } from 'redux-saga/effects'
import { fetchKeCredts, fetchKeOptions } from '../fetchers'
import { types } from '../types'
import { decorateKeOptions } from '../../App/logic'
import {
  creditsMock,
  optionsMock
} from '@colin30/shared/raw/mocks/keywordMultiplier'
import { constants } from '../../App/constants'

export function* getKeCredits() {
  try {
    // const result = yield call(fetchKeCredts)
    let result = creditsMock
    // if (process.env.NODE_ENV !== 'development') {
    //   result = yield call(fetchKeCredts)
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

export function* getKeOptions() {
  try {
    const { countries, currencies } = yield select(state => state.kE)
    if (!countries || !currencies) {
      let result = optionsMock
      if (process.env.NODE_ENV !== 'development') {
        result = yield call(fetchKeOptions)
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

export function* alertInsufficientKeCredits() {
  console.log(
    '%c alertInsufficientKeCredits',
    'color: orange; font-size: large'
  )
}
