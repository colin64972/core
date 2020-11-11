import { EditorActionTypes, EditorState } from './interfaces'
import {
  LOAD_WORKBOOK,
  UNLOAD_WORKBOOK,
  SELECT_SHEET,
  SET_PROCESSING,
  SET_TRANSFORM_SETTINGS,
  SAVE_TRANSFORM_RESULT,
  OPEN_PREVIEW,
  CLOSE_PREVIEW
} from './types'

export const initialState: EditorState = {
  workbook: null,
  currentSheet: '',
  isProcessing: false,
  transformSettings: {
    rangeStart: '',
    rangeEnd: '',
    ulTrigger: '',
    ulTriggerZero: '',
    ulTransform: '',
    olTrigger: '',
    olTransform: ''
  },
  transformResult: null,
  previewOpen: false
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
    case SET_PROCESSING:
      return {
        ...state,
        isProcessing: action.status
      }

    case SET_TRANSFORM_SETTINGS:
      return {
        ...state,
        transformSettings: action.settings
      }

    case SAVE_TRANSFORM_RESULT:
      return {
        ...state,
        transformResult: action.result
      }

    case OPEN_PREVIEW:
      return {
        ...state,
        previewOpen: true
      }

    case CLOSE_PREVIEW:
      return {
        ...state,
        previewOpen: false
      }

    default:
      return state
  }
}
