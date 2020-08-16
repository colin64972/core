import { call, put, select, take, race, delay } from 'redux-saga/effects'
import { fetchKeData, makePreOrder, fetchKeVolumes } from '../fetchers'
import { types } from '../types'
import {
  decorateKeOptions,
  decorateTrial,
  generateNotice
} from '../../App/logic'
import {
  creditsMock,
  optionsMock
} from '@colin30/shared/react/mocks/keywordMultiplier'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'
import { createHashId } from '@colin30/shared/react/helpers'

export function* getKeOptions() {
  try {
    const { countries, currencies } = yield select(state => state.kE)
    if (!countries || !currencies) {
      let result = optionsMock
      if (process.env.NODE_ENV !== 'development') {
        result = yield call(fetchKeData, Object.keys(constants.ENDPOINTS)[0])
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

export function* getKeCredits() {
  try {
    let result = creditsMock
    result = yield call(fetchKeData, Object.keys(constants.ENDPOINTS)[1])
    const credits = result?.data.credits[0]

    if (credits < constants.LOW_CREDIT_ALERT_THRESHOLD) {
      console.warn(
        '%c low credit warning',
        'color: orange; font-size: large',
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

export function* orderMetrics(action) {
  yield put({
    type: types.SET_SPINNER_STATUS,
    spinnerName: constants.VOLUME_SPINNER,
    status: true
  })
  const notice = generateNotice('Metrics purchased successfully')

  let stripeError = null

  try {
    const orderRequest = yield select(state => state.kE.orderRequest)

    const preOrderRes = yield call(
      makePreOrder,
      orderRequest,
      action.values.country,
      action.values.currency,
      action.values.dataSource
    )

    const { client_secret } = preOrderRes

    const payload = yield call(
      action.confirmCardPaymentHandler,
      client_secret,
      {
        receipt_email: action.values.billingEmail || null,
        payment_method: {
          card: action.cardNumberElement,
          billing_details: {
            email: action.values.billingEmail || null
          }
        }
      }
    )

    if (payload.error) {
      stripeError = payload.error
      throw Error('stripeError', payload.error)
    }

    const keVolumes = yield call(
      fetchKeVolumes,
      orderRequest.trialId,
      payload.paymentIntent.id,
      action.values.country,
      action.values.currency,
      action.values.dataSource
    )

    yield put({
      type: types.SET_KE_CREDITS,
      credits: keVolumes.credits
    })

    const updatedTrial = decorateTrial(keVolumes.updatedTrial)

    yield put({
      type: types.UPDATE_TRIAL,
      updatedTrial
    })
    yield put({
      type: types.SET_SPINNER_STATUS,
      spinnerName: constants.VOLUME_SPINNER,
      status: true
    })
    return action.closeDialogHandler()
  } catch (error) {
    console.error('%c FAIL', 'color: red; font-size: large', error)
    action.closeDialogHandler()
    notice.bg = constants.NOTICE.BGS.FAIL
    notice.heading = 'Payment Error'
    if (error.message === 'stripeError') {
      notice.message = stripeError.message
    }
  } finally {
    yield put({
      type: types.ADD_USER_KE_SELECTIONS,
      country: action.values.country,
      currency: action.values.currency,
      dataSource: action.values.dataSource
    })
    yield put({
      type: types.SET_SPINNER_STATUS,
      spinnerName: constants.ORDER_SPINNER,
      status: true
    })
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
}
