import { LOAD_RAW_FILE, UNLOAD_RAW_FILE } from './types'

export interface RawFile {
  name: string
  size?: number
}

export interface EditorState {
  rawFile: RawFile
}

export interface LoadRawFileAction {
  type: typeof LOAD_RAW_FILE
  rawFile: RawFile
}

export interface UnloadRawFileAction {
  type: typeof UNLOAD_RAW_FILE
}

export type EditorActionTypes = LoadRawFileAction | UnloadRawFileAction
