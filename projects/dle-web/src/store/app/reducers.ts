import { AppActionTypes, AppState } from './interfaces'
import { createHashId } from '@cjo3/shared/react/helpers'
import { CLOSE_SNACKBAR, OPEN_SNACKBAR, TOGGLE_TC, ADD_TRACKER } from './types'

export const initialState: AppState = {
  snackbar: {
    open: false,
    message: '',
    key: '',
    severity: ''
  },
  tcOpen: false,
  tracker: null
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
          severity: action.severity,
          key: createHashId()
        }
      }

    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: initialState.snackbar
      }

    case TOGGLE_TC:
      return {
        ...state,
        tcOpen: action.status
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
