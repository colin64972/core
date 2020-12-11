import { AppActionTypes } from './interfaces'
import { ADD_CONTENT } from './types'

export const addContent = (
  component: string,
  content: any
): AppActionTypes => ({
  type: ADD_CONTENT,
  component,
  content
})
