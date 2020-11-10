import { WorkBook } from 'xlsx'
import {
  LOAD_WORKBOOK,
  UNLOAD_WORKBOOK,
  SELECT_SHEET,
  SET_PROCESSING,
  SET_TRANSFORM_SETTINGS
} from './types'

export interface EditorState {
  workbook: WorkBook | null
  currentSheet: string
  transformSettings: TransformSettings
  isProcessing: boolean
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

export type EditorActionTypes =
  | LoadWorkbookAction
  | UnloadWorkbookAction
  | SelectSheetAction
  | SetProcessingAction
  | SetTransformSettingsAction
