import { State } from './index'
import { TransformSettings } from './editor/interfaces'

export const workbookSelector = (state: State) => state.editor.workbook

export const currentSheetSelector = (state: State): string =>
  state.editor.currentSheet

export const sheetDataSelector = (state: State) =>
  state.editor.workbook?.Sheets[state.editor.currentSheet]

export const transformSettingsSelector = (state: State): TransformSettings =>
  state.editor.transformSettings

export const isProcessingSelector = (state: State): boolean =>
  state.editor.isProcessing
