import { AppActionTypes, Tracker } from './interfaces'
import { CLOSE_SNACKBAR, OPEN_SNACKBAR, TOGGLE_TC, ADD_TRACKER } from './types'

export const openSnackbar = (
  message: string,
  severity: string
): AppActionTypes => ({
  type: OPEN_SNACKBAR,
  message,
  severity
})

export const closeSnackbar = (): AppActionTypes => ({
  type: CLOSE_SNACKBAR
})

export const toggleTc = (status: boolean): AppActionTypes => ({
  type: TOGGLE_TC,
  status
})

export const addTracker = (tracker: Tracker): AppActionTypes => ({
  type: ADD_TRACKER,
  tracker
})
