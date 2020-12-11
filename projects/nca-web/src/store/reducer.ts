import { AppActionTypes, AppState } from './interfaces'
import { ADD_CONTENT } from './types'

export const initialState: AppState = {
  content: null
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
    default:
      return state
  }
}
