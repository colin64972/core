import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from './types'

export interface AppState {
  snackbar: Snackbar
}

export interface Snackbar {
  key: string
  open: boolean
  message: string
  severity: string
}

export interface OpenSnackbarAction {
  type: typeof OPEN_SNACKBAR
  message: string
  severity: string
}

export interface CloseSnackbarAction {
  type: typeof CLOSE_SNACKBAR
}

export type AppActionTypes = OpenSnackbarAction | CloseSnackbarAction
