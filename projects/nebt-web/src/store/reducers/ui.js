import types from '../types'

export default (
  state = {
    notifications: [],
    spinners: {
      isLoadingOpenOrders: false,
      isLoadingOrderBook: false,
      isLoadingBalances: false,
      isWithdrawing: false,
      isDepositing: false,
      isMakingOrder: false
    }
  },
  action
) => {
  switch (action.type) {
    case types.CONNECT_DAPP_PASS:
    case types.CONNECT_DAPP_FAIL:
    case types.TRY_FETCHING_ORDERS_PASS:
    case types.TRY_FETCHING_ORDERS_FAIL:
    case types.TRY_CANCELLING_ORDER_PASS:
    case types.TRY_CANCELLING_ORDER_FAIL:
    case types.TRY_FILLING_ORDER_PASS:
    case types.TRY_FILLING_ORDER_FAIL:
    case types.TRY_FECTHING_BALANCES_PASS:
    case types.TRY_FECTHING_BALANCES_FAIL:
    case types.TRY_WITHDRAWING_PASS:
    case types.TRY_WITHDRAWING_FAIL:
    case types.TRY_DEPOSITING_PASS:
    case types.TRY_DEPOSITING_FAIL:
    case types.TRY_MAKING_NEW_ORDER_PASS:
    case types.TRY_MAKING_NEW_ORDER_FAIL:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            status: action.status,
            message: action.message
          }
        ]
      }
    case types.SET_WORKING_SPINNER:
      return {
        ...state,
        spinners: {
          ...state.spinners,
          [action.kind]: action.status
        }
      }
    default:
      return state
  }
}
