import { call, put, select, take, race, delay } from 'redux-saga/effects'
import { fetchKeMeta } from '../fetchers'
import { types } from '../types'
import { constants } from '../../App/constants'
import { generateNotice, decorateKEMeta } from '../../App/logic'
import { metaMock } from '@colin30/shared/raw/mocks/keywordMultiplier'

export function* getKeMeta() {
  try {
    const { credits, countries, currencies } = yield select(state => state.KE)
    if (!credits || !countries || !currencies) {
      let result = metaMock

      if (process.env.NODE_ENV !== 'development') {
        result = yield call(fetchKeMeta)
      }

      const decoratedData = decorateKEMeta(result.data)

      return yield put({
        type: types.SET_KE_META,
        ...decoratedData
      })
    }
    return null
  } catch (error) {
    console.error('%c getKeMeta', 'color: red; font-size: large', error)
  }
}

export function* alertInsufficientKeCredits() {
  console.log(
    '%c alertInsufficientKeCredits',
    'color: orange; font-size: large'
  )
}
