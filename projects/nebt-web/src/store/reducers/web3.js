import types from '../types'

export default (state = {}, action) => {
  switch (action.type) {
    case types.SET_ABIS:
      return {
        ...state,
        abis: action.abis,
      }
    case types.SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts,
      }
    case types.SET_CONNECTION:
      return {
        ...state,
        connection: action.connection,
      }
    case types.SET_CONTRACTS:
      return {
        ...state,
        contracts: action.contracts,
      }
    case types.SET_NETWORK:
      return {
        ...state,
        network: action.network,
      }
    case types.SET_ORDERS:
      return {
        ...state,
        orders: {
          ...state.orders,
          all: action.orders,
        },
      }
    case types.SET_FILLED_ORDERS:
      return {
        ...state,
        orders: {
          ...state.orders,
          filled: action.orders,
        },
      }
    case types.SET_CANCELLED_ORDERS:
      return {
        ...state,
        orders: {
          ...state.orders,
          cancelled: action.orders,
        },
      }
    case types.ADD_CANCELLED_ORDER:
      return {
        ...state,
        orders: {
          ...state.orders,
          cancelled: [...state.orders.cancelled, action.order],
        },
      }
    case types.ADD_FILLED_ORDER:
      return {
        ...state,
        orders: {
          ...state.orders,
          filled: [...state.orders.filled, action.order],
        },
      }
    case types.UPDATE_BALANCES:
      return {
        ...state,
        balances: action.balances,
      }
    case types.ADD_ORDER:
      return {
        ...state,
        orders: {
          ...state.orders,
          all: [...state.orders.all, action.order],
        },
      }
    default:
      return state
  }
}
