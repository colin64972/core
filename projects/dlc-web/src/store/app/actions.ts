import { AppActionTypes } from './interfaces'
import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from './types'

export const openSnackbar = (message: string, key: string): AppActionTypes => ({
  type: OPEN_SNACKBAR,
  message,
  key
})

export const closeSnackbar = (): AppActionTypes => ({
  type: CLOSE_SNACKBAR
})
