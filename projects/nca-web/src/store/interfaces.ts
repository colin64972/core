import { ADD_CONTENT } from './types'

interface Content {
  [key: string]: string[]
}

export interface AppState {
  content: Content | null
}

export interface AddContentAction {
  type: typeof ADD_CONTENT
  content: string
}

export type AppActionTypes = AddContentAction
