import { initialState } from '../initialState'
import { types } from '../types'

export const app = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NAME:
      return {
        ...state,
        name: action.name
      }
    default:
      return state
  }
}
