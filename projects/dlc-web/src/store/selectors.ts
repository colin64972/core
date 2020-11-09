import { State } from './index'

export const workbookSelector = (state: State) => state.editor.workbook

export const currentSheetSelector = (state: State) => state.editor.currentSheet

export const sheetDataSelector = (state: State) =>
  state.editor.workbook?.Sheets[state.editor.currentSheet]
