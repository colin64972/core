import { all, takeLatest, takeEvery } from 'redux-saga/effects'
import {
  tryLoadingWeb3Data,
  tryFetchingOrders,
  tryCancellingOrder,
  tryFillingOrder,
  tryFetchingBalances,
  tryWithdrawing,
  tryDepositing,
  tryMakingNewOrder,
} from './web3'
import types from '../types'

function* sagas() {
  yield all([
    yield takeLatest(types.TRY_LOADING_WEB3_DATA, tryLoadingWeb3Data),
    yield takeEvery(types.TRY_FETCHING_ORDERS, tryFetchingOrders),
    yield takeEvery(types.TRY_CANCELLING_ORDER, tryCancellingOrder),
    yield takeEvery(types.TRY_FILLING_ORDER, tryFillingOrder),
    yield takeEvery(types.TRY_FECTHING_BALANCES, tryFetchingBalances),
    yield takeEvery(types.TRY_WITHDRAWING, tryWithdrawing),
    yield takeEvery(types.TRY_DEPOSITING, tryDepositing),
    yield takeEvery(types.TRY_MAKING_NEW_ORDER, tryMakingNewOrder),
  ])
}

export default sagas
