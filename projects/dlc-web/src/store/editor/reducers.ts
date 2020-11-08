import { EditorState, EditorActionTypes } from './interfaces'
import { LOAD_RAW_FILE, UNLOAD_RAW_FILE } from './types'

const initialState: EditorState = {
  rawFile: null
}

export const editorReducer = (
  state = initialState,
  action: EditorActionTypes
): EditorState => {
  switch (action.type) {
    case LOAD_RAW_FILE:
      return {
        ...state,
        rawFile: action.rawFile
      }
    case UNLOAD_RAW_FILE:
      return {
        ...state,
        rawFile: null
      }
    default:
      return state
  }
}
