import { call, put, select, take, race, delay } from 'redux-saga/effects'
import { createTrial } from '../fetchers'
import { getCopySettings, getMatchType } from '../selectors'
import { types } from '../types'
import { KeConstants } from '@colin30/shared/raw/constants/keywordMultiplier'
import {
  decorateTrial,
  copyToClipboard,
  generateNotice,
  getSetsWithValues,
  findEnabledSets
} from '../../App/logic'

export function* multiplySets(action) {
  const notice = generateNotice('Check your results below')
  try {
    yield put({
      type: types.SET_SPINNER_STATUS,
      spinnerName: KeConstants.SETS_FORM_NAME,
      status: true
    })
    const setsWithValues = getSetsWithValues(action.values)
    const setsDisabled = yield select(state => state.app?.disabledSets)
    const setsEnabled = findEnabledSets(
      setsWithValues,
      setsDisabled,
      action.values
    )
    let clientIp = yield select(state => state.app?.clientIp)
    const posted = yield call(createTrial, {
      sets: setsEnabled,
      clientIp
    })
    const trial = yield call(decorateTrial, posted.data)
    if (!clientIp) {
      yield put({
        type: types.ADD_IP,
        clientIp: trial.clientIp
      })
    }
    yield put({
      type: types.ADD_TRIAL,
      trial
    })
    yield put({
      type: types.SHOW_TRIAL,
      id: trial.id
    })
  } catch (error) {
    notice.bg = KeConstants.NOTICE.BGS.FAIL
    notice.heading = 'Error'
    notice.message = error.message
  }
  yield put({
    type: types.SET_SPINNER_STATUS,
    spinnerName: KeConstants.SETS_FORM_NAME,
    status: false
  })
  yield put({
    type: types.ADD_NOTICE,
    notice
  })
  yield put({ type: types.SHOW_NOTICE })
  yield race({
    response: take(types.TAKE_NOTICE_RESPONSE),
    timeout: delay(KeConstants.NOTICE.TIMEOUT_DELAY)
  })
  yield put({ type: types.HIDE_NOTICE })
  yield delay(500)
  yield put({ type: types.REMOVE_NOTICE })
}

export function* copyTrial(action) {
  const notice = generateNotice(`Trial ${action.id} copied to clipboard`)
  const copySettings = yield select(state => getCopySettings(state))
  const matchType = yield select(state => getMatchType(state))
  try {
    const { ref } = action
    yield call(copyToClipboard, ref, copySettings.dataOnly, matchType)
  } catch (error) {
    notice.bg = KeConstants.NOTICE.BGS.FAIL
    notice.heading = 'Error'
    notice.message = error.message
  }
  yield put({
    type: types.ADD_NOTICE,
    notice
  })
  yield put({ type: types.SHOW_NOTICE })
  yield race({
    response: take(types.TAKE_NOTICE_RESPONSE),
    timeout: delay(KeConstants.NOTICE.TIMEOUT_DELAY)
  })
  yield put({ type: types.HIDE_NOTICE })
  yield delay(500)
  yield put({ type: types.REMOVE_NOTICE })
}

export function* copyAllTrials() {
  const notice = generateNotice('All trials copied to clipboard')
  const copySettings = yield select(state => getCopySettings(state))
  const matchType = yield select(state => getMatchType(state))
  try {
    const tbodys = document.getElementsByTagName('tbody')
    yield call(copyToClipboard, tbodys, copySettings.dataOnly, matchType)
  } catch (error) {
    notice.bg = KeConstants.NOTICE.BGS.FAIL
    notice.heading = 'Error'
    notice.message = error.message
  }
  yield put({
    type: types.ADD_NOTICE,
    notice
  })
  yield put({ type: types.SHOW_NOTICE })
  yield race({
    response: take(types.TAKE_NOTICE_RESPONSE),
    timeout: delay(KeConstants.NOTICE.TIMEOUT_DELAY)
  })
  yield put({ type: types.HIDE_NOTICE })
  yield delay(500)
  yield put({ type: types.REMOVE_NOTICE })
}

export function* askDeleteTrial(action) {
  const { id } = action
  const notice = generateNotice(
    `Are you sure you want to delete trial ${id}?`,
    KeConstants.NOTICE.KINDS.CHOICE
  )
  yield put({
    type: types.ADD_NOTICE,
    notice
  })
  yield put({ type: types.SHOW_NOTICE })
  const { response } = yield race({
    response: take(types.TAKE_NOTICE_RESPONSE),
    timeout: delay(KeConstants.NOTICE.TIMEOUT_DELAY)
  })
  if (response && response.choice === KeConstants.NOTICE.RESPONSES.ACCEPT) {
    yield put({ type: types.HIDE_NOTICE })
    yield delay(500)
    yield put({ type: types.REMOVE_NOTICE })
    yield put({ type: types.HIDE_TRIAL, id })
    yield delay(250)
    yield put({ type: types.DELETE_TRIAL, id })
  } else {
    yield put({ type: types.HIDE_NOTICE })
    yield delay(500)
    yield put({ type: types.REMOVE_NOTICE })
  }
}

export function* askDeleteAllTrials() {
  const notice = generateNotice(
    'Are you sure you want to delete all trials?',
    KeConstants.NOTICE.KINDS.CHOICE
  )
  yield put({
    type: types.ADD_NOTICE,
    notice
  })
  yield put({ type: types.SHOW_NOTICE })
  const { response } = yield race({
    response: take(types.TAKE_NOTICE_RESPONSE),
    timeout: delay(KeConstants.NOTICE.TIMEOUT_DELAY)
  })
  if (response && response.choice === KeConstants.NOTICE.RESPONSES.ACCEPT) {
    yield put({ type: types.DELETE_ALL_TRIALS })
  }
  yield put({ type: types.HIDE_NOTICE })
  yield delay(500)
  yield put({ type: types.REMOVE_NOTICE })
}

export function* askResetAll(action) {
  const notice = generateNotice(
    'Are you sure you want to reset everything?',
    KeConstants.NOTICE.KINDS.CHOICE
  )
  yield put({
    type: types.ADD_NOTICE,
    notice
  })
  yield put({ type: types.SHOW_NOTICE })
  const { response } = yield race({
    response: take(types.TAKE_NOTICE_RESPONSE),
    timeout: delay(KeConstants.NOTICE.TIMEOUT_DELAY)
  })
  if (response && response.choice === KeConstants.NOTICE.RESPONSES.ACCEPT) {
    yield call(action.handler, KeConstants.SETS_FORM_NAME)
    yield put({ type: types.RESET_ALL_BUT_NOTICE })
  }
  yield put({ type: types.HIDE_NOTICE })
  yield delay(500)
  yield put({ type: types.REMOVE_NOTICE })
}
