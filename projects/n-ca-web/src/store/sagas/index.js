import { takeLatest } from 'redux-saga/effects'

import { types } from '../types'
import { getIp } from './app'

export function* sagas() {
  yield takeLatest(types.GET_IP, getIp)
}
