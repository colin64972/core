import { CLOSE_SNACKBAR, OPEN_SNACKBAR, TOGGLE_TC } from './types'

export interface AppState {
  snackbar: Snackbar
  tcOpen: boolean
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

export interface ToggleTcAction {
  type: typeof TOGGLE_TC
  status: boolean
}

export type AppActionTypes = OpenSnackbarAction | CloseSnackbarAction
