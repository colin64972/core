import { AppActionTypes, AppState } from './interfaces'
import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from './types'

export const initialState: AppState = {
  snackbar: {
    open: false,
    message: '',
    key: ''
  }
}

export const appReducer = (
  state = initialState,
  action: AppActionTypes
): AppState => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.message,
          key: action.key
        }
      }

    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: initialState.snackbar
      }
    default:
      return state
  }
}
