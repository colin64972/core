import * as XLSX from 'xlsx'
import {
  CLOSE_PREVIEW,
  LOAD_WORKBOOK,
  OPEN_PREVIEW,
  SAVE_TRANSFORM_RESULT,
  SELECT_SHEET,
  SET_PROCESSING,
  SET_TRANSFORM_SETTINGS,
  UNLOAD_WORKBOOK
} from './types'

export interface EditorState {
  workbook: XLSX.WorkBook | null
  currentSheet: string
  transformSettings: TransformSettings
  isProcessing: boolean
  transformResult: TransformResult | null
  previewOpen: boolean
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

export interface DataUrlCollection {
  [key: string]: {
    addresses: string[]
    original: string
    transform: string
  }
}

export interface TransformSummary {
  count: number
  originalValues: string[]
  changedValues: string[]
  addresses: string[]
  dataUrls: DataUrlCollection
}

export interface TransformResultCellMeta {
  address: string
  coordinates: { c: number; r: number }
  caseType: string
  trigger: string
  original: XLSX.CellObject
}

export interface TransformValue {
  t: string
  v: string | number
  z?: string
}

export interface TransformResultCell {
  t: string
  v: string | number
  w?: string
  z?: string
  meta: TransformResultCellMeta
}

export interface TransformResultCellCollection {
  [key: string]: TransformResultCell
}

export interface ScopeRange {
  e: {
    c: number,
    r: number
  },
  s: {
    c: number,
    r: number
  }
}

export interface TransformResult {
  ul: TransformSummary
  ol: TransformSummary
  zero: TransformSummary
  all: TransformResultCellCollection
  scope: ScopeRange

export interface CellValue {
  t: string
  v: string | number
  w: string
}

export interface LoadWorkbookAction {
  type: typeof LOAD_WORKBOOK
  workbook: XLSX.WorkBook
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

export interface OpenPreviewAction {
  type: typeof OPEN_PREVIEW
}

export interface ClosePreviewAction {
  type: typeof CLOSE_PREVIEW
}

export type EditorActionTypes =
  | LoadWorkbookAction
  | UnloadWorkbookAction
  | SelectSheetAction
  | SetProcessingAction
  | SetTransformSettingsAction
  | SaveResultAction
  | OpenPreviewAction
  | ClosePreviewAction
