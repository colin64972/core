import { takeLatest } from 'redux-saga/effects'

import { types } from '../types'
import {
  askDeleteAllTrials,
  askDeleteTrial,
  askResetAll,
  copyAllTrials,
  copyTrial,
  multiplySets
} from './app'
import { getKeCredits, getKeOptions, orderMetrics } from './keywordsEverywhere'

export function* sagas() {
  yield takeLatest(types.MULTIPLY_SETS, multiplySets)
  yield takeLatest(types.COPY_TRIAL, copyTrial)
  yield takeLatest(types.COPY_ALL_TRIALS, copyAllTrials)
  yield takeLatest(types.ASK_DELETE_TRIAL, askDeleteTrial)
  yield takeLatest(types.ASK_DELETE_ALL_TRIALS, askDeleteAllTrials)
  yield takeLatest(types.ASK_RESET_ALL, askResetAll)
  yield takeLatest(types.GET_KE_CREDITS, getKeCredits)
  yield takeLatest(types.GET_KE_OPTIONS, getKeOptions)
  yield takeLatest(types.ORDER_METRICS, orderMetrics)
}
