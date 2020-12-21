import { ADD_CONTENT, ADD_TRACKER } from './types'
import * as ReactGA from 'react-ga'

interface Content {
  [key: string]: string[]
}

export interface AppState {
  content: Content | null
  tracker: Tracker | null
}

export interface AddContentAction {
  type: typeof ADD_CONTENT
  content: string
}

export interface Tracker {
  config: {
    gaTag: string
  }
  initialize: () => ReactGA.InitializeOptions
  pageHit: (rootPath: string, pathname: string) => void
  eventHit: (event: ReactGA.EventArgs) => void
}

export interface AddTrackerAction {
  type: typeof ADD_TRACKER
  tracker: Tracker
}

export type AppActionTypes = AddContentAction | AddTrackerAction
