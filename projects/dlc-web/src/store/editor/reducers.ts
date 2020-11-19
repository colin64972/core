import { EditorActionTypes, EditorState } from './interfaces'
import {
  CLOSE_PREVIEW,
  LOAD_WORKBOOK,
  OPEN_PREVIEW,
  SAVE_TRANSFORM_RESULT,
  SELECT_SHEET,
  SET_PROCESSING,
  SET_TRANSFORM_SETTINGS,
  UNLOAD_WORKBOOK,
  DISCARD_TRANSFORM_RESULT,
  SAVE_FILENAME,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR
} from './types'

export const initialState: EditorState = {
  workbook: null,
  workbookName: '',
  currentSheetName: '',
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
  previewOpen: false,
  snackbar: {
    open: false,
    message: ''
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

    case SAVE_FILENAME:
      return {
        ...state,
        workbookName: action.name
      }

    case UNLOAD_WORKBOOK:
      return {
        ...initialState
      }

    case SELECT_SHEET:
      return {
        ...state,
        currentSheetName: action.name,
        transformResult: initialState.transformResult
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

    case DISCARD_TRANSFORM_RESULT:
      return {
        ...state,
        transformResult: initialState.transformResult
      }

    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.message
        }
      }

    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: initialState.snackbar
      }
    default:
      return state
  }
}
