import { constants } from '../../App/constants'
import { types } from '../types'

const defaultState = {
  credits: null,
  countries: null,
  currencies: null
}

export const KE = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_KE_META:
      const { credits, countries, currencies } = action
      return {
        ...state,
        credits,
        countries,
        currencies
      }
    default:
      return state
  }
}
