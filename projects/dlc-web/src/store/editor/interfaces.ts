import { WorkBook } from 'xlsx'
import {
  LOAD_WORKBOOK,
  UNLOAD_WORKBOOK,
  SELECT_SHEET,
  SET_PROCESSING,
  SET_TRANSFORM_SETTINGS,
  SAVE_TRANSFORM_RESULT
} from './types'

export interface EditorState {
  workbook: WorkBook | null
  currentSheet: string
  transformSettings: TransformSettings
  isProcessing: boolean
  transformResult: TransformResult | null
}

export interface RawFile {
  name: string
  size?: number
}

export interface TransformSettings {
  rangeStart: string
  rangeEnd: string
  ulTrigger: string
  ulTriggerZero: string
  ulTransform: string
  olTrigger: string
  olTransform: string
}

export interface TransformSummary {
  count: number
  originalValues: string[]
  changedValues: string[]
  addresses: string[]
}

export interface TransformResult {
  ul: TransformSummary
  ol: TransformSummary
  zero: TransformSummary
  all: {
    [key: string]: {
      address: string
      colNum: number
      rowNum: number
      original: string
      transformKind: string
      trigger: string
      result: {
        t: string
        v: string | number
        w: string
      }
    }
  }
}

export interface ScopeRange {
  start: {
    colId: string
    colNum: number
    rowNum: number
  }
  end: {
    colId: string
    colNum: number
    rowNum: number
  }
}

export interface LoadWorkbookAction {
  type: typeof LOAD_WORKBOOK
  workbook: WorkBook
}

export interface UnloadWorkbookAction {
  type: typeof UNLOAD_WORKBOOK
}

export interface SelectSheetAction {
  type: typeof SELECT_SHEET
  name: string
}

export interface SetProcessingAction {
  type: typeof SET_PROCESSING
  status: boolean
}

export interface SetTransformSettingsAction {
  type: typeof SET_TRANSFORM_SETTINGS
  settings: TransformSettings
}

export interface SaveResultAction {
  type: typeof SAVE_TRANSFORM_RESULT
  result: TransformResult
}

export type EditorActionTypes =
  | LoadWorkbookAction
  | UnloadWorkbookAction
  | SelectSheetAction
  | SetProcessingAction
  | SetTransformSettingsAction
  | SaveResultAction
