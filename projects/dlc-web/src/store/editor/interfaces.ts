import { WorkBook } from 'xlsx'
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
  workbook: WorkBook | null
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

export interface TransformResultCell {
  address: string
  rowIndex: number
  cellIndex: number
  original: string
  transformKind: string
  trigger: string
  result: {
    t: string
    v: string | number
    w: string
  }
}

export interface TransformResult {
  ul: TransformSummary
  ol: TransformSummary
  zero: TransformSummary
  all: {
    [key: string]: TransformResultCell
  }
  scope: string
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
