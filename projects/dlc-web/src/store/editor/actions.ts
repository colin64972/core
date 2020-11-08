import { WorkBook } from 'xlsx'
import { EditorActionTypes, RawFile } from './interfaces'
import {
  LOAD_RAW_FILE,
  LOAD_WORKBOOK,
  SELECT_SHEET,
  UNLOAD_RAW_FILE
} from './types'

export const loadRawFile = (file: RawFile): EditorActionTypes => ({
  type: LOAD_RAW_FILE,
  rawFile: file
})

export const unloadRawFile = (): EditorActionTypes => ({
  type: UNLOAD_RAW_FILE
})

export const loadWorkbook = (workbook: WorkBook): EditorActionTypes => ({
  type: LOAD_WORKBOOK,
  workbook
})

export const selectSheet = (name: string): EditorActionTypes => ({
  type: SELECT_SHEET,
  name
})
