import { call, delay, put, race, select, take } from 'redux-saga/effects'
import {
  decorateKeOptions,
  decorateTrial,
  generateNotice
} from '@cjo3/shared/logic/keyword-multiplier'
import {
  fetchKeData,
  fetchKeVolumes,
  makePreOrder,
  postLowCreditAlert
} from '../fetchers'

import { constants } from '@cjo3/shared/raw/constants/keyword-multiplier'
import { getLabelFromValue } from '@cjo3/shared/react/helpers'
import { types } from '../types'

export function* getKeOptions() {
  try {
    const { countries, currencies } = yield select(state => state.kE)
    if (!countries || !currencies) {
      const result = yield call(
        fetchKeData,
        Object.keys(constants.ENDPOINTS)[0]
      )
      const decoratedData = decorateKeOptions(result.data)
      return yield put({
        type: types.SET_KE_OPTIONS,
        ...decoratedData
      })
    }
    return null
  } catch (error) {
    // TODO
  }
}

export function* getKeCredits() {
  try {
    const result = yield call(fetchKeData, Object.keys(constants.ENDPOINTS)[1])
    const credits = result?.data.credits[0]

    if (
      credits < constants.LOW_CREDIT_ALERT_THRESHOLD &&
      !process.env.USE_MOCKS
    ) {
      yield call(postLowCreditAlert, credits)
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
    const tracker = yield select(state => state.app?.tracker)
    const kECountries = yield select(state => state.kE?.countries)
    const kECurrencies = yield select(state => state.kE?.currencies)
    const kEDataSources = yield select(state => state.kE?.dataSources)

    const readableKeOptions = {
      country: getLabelFromValue(action.values.country, kECountries),
      currency: getLabelFromValue(action.values.currency, kECurrencies),
      dataSource: getLabelFromValue(action.values.dataSource, kEDataSources)
    }

    const preOrderRes = yield call(
      makePreOrder,
      orderRequest,
      action.values.country,
      action.values.currency,
      action.values.dataSource,
      readableKeOptions
    )

    const { client_secret } = preOrderRes

    let payload

    payload = yield call(action.confirmCardPaymentHandler, client_secret, {
      receipt_email: action.values.billingEmail || null,
      payment_method: {
        card: action.cardNumberElement,
        billing_details: {
          email: action.values.billingEmail || null
        }
      }
    })

    yield call(tracker.eventHit, {
      category: 'trials',
      action: 'metrics_purchase',
      label: orderRequest.trialId,
      value: parseFloat(orderRequest.price.total) * 100
    })

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
      status: false
    })
    return action.closeDialogHandler()
  } catch (error) {
    console.error('%c FAIL', 'color: red; font-size: large', error, stripeError)
    action.closeDialogHandler()
    notice.bg = constants.NOTICE.BGS.FAIL
    notice.heading = 'Payment Error'
    notice.message = 'Please try again later'
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
