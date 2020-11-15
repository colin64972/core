import { WorkBook } from 'xlsx'
import {
  EditorActionTypes,
  TransformResult,
  TransformSettings
} from './interfaces'
import {
  CLOSE_PREVIEW,
  LOAD_WORKBOOK,
  OPEN_PREVIEW,
  SAVE_TRANSFORM_RESULT,
  SELECT_SHEET,
  SET_PROCESSING,
  SET_TRANSFORM_SETTINGS,
  UNLOAD_WORKBOOK,
  DISCARD_TRANSFORM_RESULT
} from './types'

export const loadWorkbook = (workbook: WorkBook): EditorActionTypes => ({
  type: LOAD_WORKBOOK,
  workbook
})

export const unloadWorkbook = (): EditorActionTypes => ({
  type: UNLOAD_WORKBOOK
})

export const selectSheet = (name: string): EditorActionTypes => ({
  type: SELECT_SHEET,
  name
})

export const setProcessing = (status: boolean): EditorActionTypes => ({
  type: SET_PROCESSING,
  status
})

export const setTransformSettings = (
  settings: TransformSettings
): EditorActionTypes => ({
  type: SET_TRANSFORM_SETTINGS,
  settings
})

export const saveTransformResult = (
  result: TransformResult
): EditorActionTypes => ({
  type: SAVE_TRANSFORM_RESULT,
  result
})

export const discardTransformResult = (): EditorActionTypes => ({
  type: DISCARD_TRANSFORM_RESULT
})

export const openPreview = (): EditorActionTypes => ({
  type: OPEN_PREVIEW
})

export const closePreview = (): EditorActionTypes => ({
  type: CLOSE_PREVIEW
})
