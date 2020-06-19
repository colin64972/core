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
  }
}

export const KE = (state = defaultState, action) => {
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
    case 'ZERO_CREDITS':
      return {
        ...state,
        credits: 0
      }
    case 'FILL_CREDITS':
      return {
        ...state,
        credits: action.count
      }
    default:
      return state
  }
}
