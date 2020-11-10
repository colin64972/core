import { EditorActionTypes, EditorState } from './interfaces'
import { LOAD_WORKBOOK, UNLOAD_WORKBOOK, SELECT_SHEET } from './types'

export const initialState: EditorState = {
  workbook: null,
  currentSheet: '',
  transformSettings: {
    rangeStart: '',
    rangeEnd: '',
    ulTrigger: '',
    ulTriggerZero: '',
    ulTransform: '',
    olTrigger: '',
    olTransform: ''
  }
}

export const editorReducer = (
  state = initialState,
  action: EditorActionTypes
): EditorState => {
  switch (action.type) {
    case LOAD_WORKBOOK:
      return {
        ...state,
        workbook: action.workbook
      }

    case UNLOAD_WORKBOOK:
      return {
        ...initialState
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
