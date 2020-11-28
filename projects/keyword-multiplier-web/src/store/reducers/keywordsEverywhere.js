import { types } from '../types'

const defaultState = {
  credits: null,
  countries: null,
  currencies: null,
  dataSources: null,
  userSelections: {
    country: null,
    currency: null,
    dataSource: null
  },
  orderRequest: null
}

export const kE = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_KE_CREDITS:
      return {
        ...state,
        credits: parseInt(action.credits)
      }
    case types.SET_KE_OPTIONS:
      const { countries, currencies, dataSources } = action
      return {
        ...state,
        countries,
        currencies,
        dataSources
      }
    case types.SET_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: {
          trialId: action.trialId,
          price: action.price
        }
      }
    case types.ADD_USER_KE_SELECTIONS:
      const { country, currency, dataSource } = action
      return {
        ...state,
        userSelections: {
          country,
          currency,
          dataSource
        }
      }
    case types.CLEAR_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: defaultState.orderRequest
      }
    default:
      return state
  }
}
