import { constants } from '../../App/constants'
import { types } from '../types'

const defaultState = {
  credits: null,
  countries: null,
  currencies: null
}

export const keywordsEverywhere = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_KEYWORDS_EVERYWHERE_OPTIONS:
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
