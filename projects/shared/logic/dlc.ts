import XLSX from 'xlsx'
import { mergeSort } from '@cjo3/shared/general/sorting'
import { transformFunctionValues } from '@cjo3/dlc-web/src/constants'
import { fromBase26 } from '../general/conversion'

const setResult = (kind, value, trigger) => {
  let temp,
    transformed,
    hasSigFigs = false

  if (value.includes('.')) {
    hasSigFigs = value.substring(value.lastIndexOf('.') + 1).length
  }

  switch (kind) {
    case transformFunctionValues.leave:
      temp = value.replace(trigger, '')
      if (temp.includes('.')) {
        transformed = parseFloat(temp)
      } else {
        transformed = parseInt(temp)
      }
      return {
        t: 'n',
        v: transformed,
        w: transformed.toString()
      }

    case transformFunctionValues.halve:
      temp = value.replace(trigger, '')
      if (temp.includes('.')) {
        transformed = parseFloat(temp) / 2
      } else {
        transformed = parseInt(temp) / 2
      }
      return {
        t: 'n',
        v: transformed,
        w: transformed.toString()
      }

    case transformFunctionValues.zero:
      return {
        t: 's',
        v: 0,
        w: '0'
      }

    case transformFunctionValues.none:
      return {
        t: 's',
        v: value,
        w: value
      }
  }
}

export const processSheet = (sheet, settings) => {
  if (!sheet) return null

  const {
    rangeStart,
    rangeEnd,
    ulTrigger,
    ulTriggerZero,
    ulTransform,
    olTrigger,
    olTransform
  } = settings

  const sheetData = sheet

  delete sheetData['!ref']
  delete sheetData['!margins']

  const scope = {
    colStart: fromBase26(rangeStart.replace(/\d+/gi, '')),
    colEnd: fromBase26(rangeEnd.replace(/\d+/gi, '')),
    rowStart: parseInt(rangeStart.replace(/[a-z]+/gi, '')),
    rowEnd: parseInt(rangeEnd.replace(/[a-z]+/gi, ''))
  }

  return Object.entries(sheetData).reduce((acc, cur, ind) => {
    const temp = acc

    const [address, { v, t, w }] = cur

    const colId = address.replace(/\d+/gi, '').toLowerCase()
    const colNum = fromBase26(colId)

    const rowId = address.replace(/[a-z]+/gi, '')
    const rowNum = parseInt(rowId)

    if (
      colNum >= scope.colStart &&
      colNum <= scope.colEnd &&
      rowNum >= scope.rowStart &&
      rowNum <= scope.rowEnd
    ) {
      const ulPattern = new RegExp(`^\\${ulTrigger}\\s*?\\d*(\\.\\d*)?$`)
      const olPattern = new RegExp(`^\\${olTrigger}\\s*?\\d*(\\.\\d*)?$`)

      const meta = {
        address,
        colNum,
        rowNum,
        original: v
      }

      if (
        ulTriggerZero.length !== '' &&
        v &&
        t === 's' &&
        v === ulTriggerZero
      ) {
        temp[address] = {
          ...meta,
          result: setResult('zero', v)
        }
        return temp
      }

      if (t === 's' && ulPattern.test(v)) {
        temp[address] = {
          ...meta,
          result: setResult(ulTransform, v, ulTrigger)
        }
        return temp
      }

      if (t === 's' && olPattern.test(v)) {
        temp[address] = {
          ...meta,
          result: setResult(olTransform, v, olTrigger)
        }
        return temp
      }
    }

    return temp
  }, {})
}
