import { Snackbar } from './app/interfaces'
import { TransformResult } from './converter/interfaces'
import { State } from './index'

export const workbookSelector = (state: State) => state.converter.workbook

export const currentSheetNameSelector = (state: State): string =>
  state.converter.currentSheetName

export const sheetDataSelector = (state: State) =>
  state.converter.workbook?.Sheets[state.converter.currentSheetName]

export const isProcessingSelector = (state: State): boolean =>
  state.converter.isProcessing

export const transformResultSelector = (state: State): TransformResult =>
  state.converter.transformResult

export const previewOpenSelector = (state: State): boolean =>
  state.converter.previewOpen

export const workbookNameSelector = (state: State): string =>
  state.converter.workbookName

export const snackbarSelector = (state: State): Snackbar => state.app.snackbar

export const tcOpenSelector = (state: State): boolean => state.app.tcOpen
