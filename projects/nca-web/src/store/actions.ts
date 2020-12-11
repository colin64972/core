import { AppActionTypes } from './interfaces'
import { ADD_CONTENT } from './types'

export const addContent = (content: any): AppActionTypes => ({
  type: ADD_CONTENT,
  content
})
