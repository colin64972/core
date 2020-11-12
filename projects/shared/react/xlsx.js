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

export const convertSheet = (sheet, range = null) => {
  const options = {
    blankrows: true,
    raw: true,
    header: 1,
    defval: null
  }

  if (range) {
    options.range = range.toUpperCase()
  }

  return utils.sheet_to_json(sheet, options)
}

const getCellAddressInt = (address, target) => {
  let temp
  if (target === 'row') {
    temp = address.replace(/[a-z]+/gi, '')
    return parseInt(temp)
  }
  temp = address.replace(/\d+/gi, '').toLowerCase()
  return fromBase26(temp)
}

export const setCellAddress = (rangeStart, rowIndex, cellIndex) => {
  let startCell = 'a1'

  if (rangeStart) {
    startCell = rangeStart
  }

  const rowStartNum = getCellAddressInt(startCell, 'row')
  const colStartNum = getCellAddressInt(startCell, 'col')
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
  const rowStartNum = getCellAddressInt(start[0], 'row')
  const colStartNum = getCellAddressInt(start[0], 'col')
  return {
    colOffset: colStartNum,
    rowOffset: rowStartNum
  }
}

export const convertColNumToId = int => toBase26(int).toUpperCase()
