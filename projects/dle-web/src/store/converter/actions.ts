import { WorkBook } from 'xlsx'
import {
  ConverterActionTypes,
  TransformResult,
  TransformSettings
} from './interfaces'
import {
  CLOSE_PREVIEW,
  DISCARD_TRANSFORM_RESULT,
  LOAD_WORKBOOK,
  OPEN_PREVIEW,
  SAVE_FILENAME,
  SAVE_TRANSFORM_RESULT,
  SELECT_SHEET,
  SET_PROCESSING,
  SET_TRANSFORM_SETTINGS,
  UNLOAD_WORKBOOK
} from './types'

export const loadWorkbook = (workbook: WorkBook): ConverterActionTypes => ({
  type: LOAD_WORKBOOK,
  workbook
})

export const saveFilename = (name: string): ConverterActionTypes => ({
  type: SAVE_FILENAME,
  name
})

export const unloadWorkbook = (): ConverterActionTypes => ({
  type: UNLOAD_WORKBOOK
})

export const selectSheet = (name: string): ConverterActionTypes => ({
  type: SELECT_SHEET,
  name
})

export const setProcessing = (status: boolean): ConverterActionTypes => ({
  type: SET_PROCESSING,
  status
})

export const setTransformSettings = (
  settings: TransformSettings
): ConverterActionTypes => ({
  type: SET_TRANSFORM_SETTINGS,
  settings
})

export const saveTransformResult = (
  result: TransformResult
): ConverterActionTypes => ({
  type: SAVE_TRANSFORM_RESULT,
  result
})

export const discardTransformResult = (): ConverterActionTypes => ({
  type: DISCARD_TRANSFORM_RESULT
})

export const openPreview = (): ConverterActionTypes => ({
  type: OPEN_PREVIEW
})

export const closePreview = (): ConverterActionTypes => ({
  type: CLOSE_PREVIEW
})
