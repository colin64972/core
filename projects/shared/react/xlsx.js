import { read, utils } from 'xlsx'
import { fromBase26, toBase26 } from '../general/conversion'

export const createWorkbook = (fileBlob, callback) => {
  const reader = new FileReader()
  reader.onload = event => {
    const arrayBuffer = new Uint8Array(event.target.result)
    const wb = read(arrayBuffer, { type: 'array' })
    if (wb) callback(wb)
  }
  reader.onerror = event => {
    console.error(
      '%c ERROR reader.onerror',
      'color: red; font-size: large',
      event
    )
  }
  reader.readAsArrayBuffer(fileBlob)
}

export const convertSheet = (sheet, range = null) =>
  utils.sheet_to_json(sheet, {
    blankrows: true,
    raw: true,
    header: 1,
    range: typeof range === 'string' ? range.toUpperCase() : range,
    defval: null
  })

export const setCellAddress = (rangeStart, rangeEnd, rowIndex, cellIndex) => {
  const rowStartId = rangeStart.replace(/[a-z]+/gi, '')
  const rowStartNum = parseInt(rowStartId)
  const colStartId = rangeStart.replace(/\d+/gi, '').toLowerCase()
  const colStartNum = fromBase26(colStartId)
  const col = toBase26(colStartNum + cellIndex).toUpperCase()
  const row = rowStartNum + rowIndex
  return {
    rowStartNum,
    colStartNum,
    address: `${col}${row}`
  }
}

export const getScopeOffsets = scope => {
  const start = scope.split(':')
  const colId = start[0].replace(/\d+/gi, '').toLowerCase()
  const rowId = start[0].replace(/[a-z]+/gi, '')
  const colStartNum = fromBase26(colId)
  const rowStartNum = parseInt(rowId)
  return {
    colOffset: colStartNum,
    rowOffset: rowStartNum
  }
}

export const convertColNumToId = int => toBase26(int).toUpperCase()
