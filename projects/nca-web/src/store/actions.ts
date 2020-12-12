import { AppActionTypes, Tracker } from './interfaces'
import { ADD_CONTENT, ADD_TRACKER } from './types'

export const addContent = (content: any): AppActionTypes => ({
  type: ADD_CONTENT,
  content
})

export const addTracker = (tracker: Tracker): AppActionTypes => ({
  type: ADD_TRACKER,
  tracker
})
