import { Snackbar } from './app/interfaces'
import { TransformResult } from './editor/interfaces'
import { State } from './index'

export const workbookSelector = (state: State) => state.editor.workbook

export const currentSheetNameSelector = (state: State): string =>
  state.editor.currentSheetName

export const sheetDataSelector = (state: State) =>
  state.editor.workbook?.Sheets[state.editor.currentSheetName]

export const isProcessingSelector = (state: State): boolean =>
  state.editor.isProcessing

export const transformResultSelector = (state: State): TransformResult =>
  state.editor.transformResult

export const previewOpenSelector = (state: State): boolean =>
  state.editor.previewOpen

export const workbookNameSelector = (state: State): string =>
  state.editor.workbookName

export const snackbarSelector = (state: State): Snackbar => state.app.snackbar
