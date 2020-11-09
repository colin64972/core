import { WorkBook } from 'xlsx'
import { EditorActionTypes } from './interfaces'
import { LOAD_WORKBOOK, UNLOAD_WORKBOOK, SELECT_SHEET } from './types'

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
