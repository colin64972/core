import { AppActionTypes } from './interfaces'
import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from './types'

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
