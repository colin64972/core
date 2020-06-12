import { call, put, select, take, race, delay } from 'redux-saga/effects'
import { fetchKeMeta } from '@colin30/shared/react/saga'
import { types } from '../types'
import { constants } from '../../App/constants'
import { generateNotice, decorateKEMeta } from '../../App/logic'
import { metaMock } from '@colin30/shared/raw/mocks/keywordMultiplier'

export function* getKeMeta() {
  try {
    const { credits, countries, currencies } = yield select(state => state.KE)
    if (credits || countries || currencies) return null

    // let result = yield call(fetchKeMeta)

    let result = metaMock
    if (process.env.NODE_ENV === 'production') {
      result = yield call(fetchKeMeta)
    }

    if (result.status === 200) {
      const decoratedData = decorateKEMeta(result.data)
      return yield put({
        type: types.SET_KE_META,
        ...decoratedData
      })
    }
  } catch (error) {
    console.error('%c getKeMeta', 'color: red; font-size: large', error)
  }
}
