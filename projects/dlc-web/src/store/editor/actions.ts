import { WorkBook } from 'xlsx'
import { EditorActionTypes, TransformSettings } from './interfaces'
import {
  LOAD_WORKBOOK,
  UNLOAD_WORKBOOK,
  SELECT_SHEET,
  SET_PROCESSING,
  SET_TRANSFORM_SETTINGS
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
