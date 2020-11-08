import { EditorActionTypes, EditorState } from './interfaces'
import {
  LOAD_RAW_FILE,
  LOAD_WORKBOOK,
  SELECT_SHEET,
  UNLOAD_RAW_FILE
} from './types'

const initialState: EditorState = {
  rawFile: null,
  workbook: null,
  currentSheet: ''
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
        ...initialState
      }

    case LOAD_WORKBOOK:
      return {
        ...state,
        workbook: action.workbook
      }

    case SELECT_SHEET:
      return {
        ...state,
        currentSheet: action.name
      }

    default:
      return state
  }
}
