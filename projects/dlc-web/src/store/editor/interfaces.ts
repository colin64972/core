import { WorkBook } from 'xlsx'
import {
  LOAD_RAW_FILE,
  LOAD_WORKBOOK,
  SELECT_SHEET,
  UNLOAD_RAW_FILE
} from './types'

export interface EditorState {
  rawFile: RawFile
  workbook: WorkBook | null
  currentSheet: string
}

export interface RawFile {
  name: string
  size?: number
}

export interface LoadRawFileAction {
  type: typeof LOAD_RAW_FILE
  rawFile: RawFile
}

export interface UnloadRawFileAction {
  type: typeof UNLOAD_RAW_FILE
}

export interface LoadWorkbookAction {
  type: typeof LOAD_WORKBOOK
  workbook: WorkBook
}

export interface SelectSheetAction {
  type: typeof SELECT_SHEET
  name: string
}

export type EditorActionTypes =
  | LoadRawFileAction
  | UnloadRawFileAction
  | LoadWorkbookAction
  | SelectSheetAction
