import { ADD_CONTENT } from './types'

export interface AppState {
  content: {}
}

export interface AddContentAction {
  type: typeof ADD_CONTENT
  component: string
  content: string
}

export type AppActionTypes = AddContentAction
