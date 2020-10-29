import { takeLatest } from 'redux-saga/effects'
import { getIp } from './app'
import { types } from '../types'

export function* sagas() {
  yield takeLatest(types.GET_IP, getIp)
}
