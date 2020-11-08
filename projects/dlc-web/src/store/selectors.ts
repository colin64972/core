import { State } from './index'

export const rawFileSelector = (state: State) => state.editor.rawFile

export const workbookSelector = (state: State) => state.editor.workbook

export const currentSheetSelector = (state: State) => state.editor.currentSheet
