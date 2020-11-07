import { RawFile, EditorActionTypes } from './interfaces'
import { LOAD_RAW_FILE, UNLOAD_RAW_FILE } from './types'

export const loadRawFile = (file: RawFile): EditorActionTypes => ({
  type: LOAD_RAW_FILE,
  rawFile: file
})

export const unloadRawFile = (): EditorActionTypes => ({
  type: UNLOAD_RAW_FILE
})
