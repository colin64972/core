import { AppActionTypes } from './interfaces'
import { CLOSE_SNACKBAR, OPEN_SNACKBAR, TOGGLE_TC } from './types'

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
