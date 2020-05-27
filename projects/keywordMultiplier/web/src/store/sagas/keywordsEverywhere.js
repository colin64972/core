import { call, put, select, take, race, delay } from 'redux-saga/effects'
import { getKeywordsEverywhereOptions } from '@colin30/shared/react/saga'
import { types } from '../types'
import { constants } from '../../App/constants'
import {
  generateNotice,
  decorateKeywordsEverywhereOptions
} from '../../App/logic'

export function* fetchOptions() {
  const notice = generateNotice('Volume options updated')
  try {
    const result = yield call(getKeywordsEverywhereOptions)
    const decoratedData = decorateKeywordsEverywhereOptions(result.data)
    if (result.status === 200)
      return yield put({
        type: types.SET_KEYWORDS_EVERYWHERE_OPTIONS,
        ...decoratedData
      })
  } catch (error) {
    notice.bg = constants.NOTICE.BGS.FAIL
    notice.heading = 'Error'
    notice.message = 'Sorry, please try again later'
  }
  yield put({
    type: types.ADD_NOTICE,
    notice
  })
  yield put({ type: types.SHOW_NOTICE })
  yield race({
    response: take(types.TAKE_NOTICE_RESPONSE),
    timeout: delay(constants.NOTICE.TIMEOUT_DELAY)
  })
  yield put({ type: types.HIDE_NOTICE })
  yield delay(500)
  yield put({ type: types.REMOVE_NOTICE })
}

export function* fetchVolumeOptions() {
  try {
  } catch (error) {}
}
