import { AppActionTypes, AppState } from './interfaces'
import { ADD_CONTENT, ADD_TRACKER } from './types'

export const initialState: AppState = {
  content: null,
  tracker: null
}

export const appReducer = (
  state = initialState,
  action: AppActionTypes
): AppState => {
  switch (action.type) {
    case ADD_CONTENT:
      return {
        ...state,
        content: {
          ...action.content
        }
      }
    case ADD_TRACKER:
      return {
        ...state,
        tracker: action.tracker
      }
    default:
      return state
  }
}
