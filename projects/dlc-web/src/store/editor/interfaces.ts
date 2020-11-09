import { WorkBook } from 'xlsx'
import { LOAD_WORKBOOK, UNLOAD_WORKBOOK, SELECT_SHEET } from './types'

export interface EditorState {
  workbook: WorkBook | null
  currentSheet: string
}

export interface RawFile {
  name: string
  size?: number
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

export type EditorActionTypes =
  | LoadWorkbookAction
  | UnloadWorkbookAction
  | SelectSheetAction
