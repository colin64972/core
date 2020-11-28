import {
  ADD_TRACKER,
  CLOSE_SNACKBAR,
  OPEN_SNACKBAR,
  TOGGLE_TC,
  ADD_MODERNIZR_FEATURE
} from './types'
import * as ReactGA from 'react-ga'

export interface AppState {
  snackbar: Snackbar
  tcOpen: boolean
  tracker: Tracker
  features: string[]
}

export interface Snackbar {
  key: string
  open: boolean
  message: string
  severity: string
}

export interface Tracker {
  config: {
    gaTag: string
  }
  initialize: () => ReactGA.InitializeOptions
  pageHit: (rootPath: string, pathname: string) => void
  eventHit: (event: ReactGA.EventArgs) => void
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

export interface AddTrackerAction {
  type: typeof ADD_TRACKER
  tracker: Tracker
}
export interface AddModernizrFeatureAction {
  type: typeof ADD_MODERNIZR_FEATURE
  feature: string
}

export type AppActionTypes =
  | OpenSnackbarAction
  | CloseSnackbarAction
  | ToggleTcAction
  | AddTrackerAction
  | AddModernizrFeatureAction
