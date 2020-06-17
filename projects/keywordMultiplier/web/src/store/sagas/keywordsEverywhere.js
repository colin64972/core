import { call, put, select } from 'redux-saga/effects'
import { fetchKeCredts, fetchKeOptions } from '../fetchers'
import { types } from '../types'
import { decorateKeOptions } from '../../App/logic'
import {
  creditsMock,
  optionsMock
} from '@colin30/shared/raw/mocks/keywordMultiplier'

export function* getKeCredits() {
  try {
    // const result = yield call(fetchKeCredts)
    let result = creditsMock
    if (process.env.NODE_ENV !== 'development') {
      result = yield call(fetchKeCredts)
    }
    yield put({
      type: types.SET_KE_CREDITS,
      credits: result?.data.credits[0]
    })
  } catch (error) {
    console.error('%c getKeCredits', 'color: red; font-size: large', error)
  }
}

export function* getKeOptions() {
  try {
    const { countries, currencies } = yield select(state => state.KE)
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
