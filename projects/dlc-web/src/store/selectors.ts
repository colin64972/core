import { TransformResult } from './editor/interfaces'
import { State } from './index'

export const workbookSelector = (state: State) => state.editor.workbook

export const currentSheetSelector = (state: State): string =>
  state.editor.currentSheet

export const sheetDataSelector = (state: State) =>
  state.editor.workbook?.Sheets[state.editor.currentSheet]

export const isProcessingSelector = (state: State): boolean =>
  state.editor.isProcessing

export const transformResultSelector = (state: State): TransformResult =>
  state.editor.transformResult

export const previewOpenSelector = (state: State): boolean =>
  state.editor.previewOpen
