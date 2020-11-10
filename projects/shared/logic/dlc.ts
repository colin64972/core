import XLSX from 'xlsx'
import { mergeSort } from '@cjo3/shared/general/sorting'
import { transformFunctionValues } from '@cjo3/dlc-web/src/constants'

const setResult = (kind, value, trigger) => {
  let temp, transformed

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

  const sheetData = sheet

  const sheetMeta = {
    // rowStart: parseInt(sheetData['!ref'].split(':')[0].replace(/[a-z]+/gi, '')),
    // rowEnd: parseInt(sheetData['!ref'].split(':')[1].replace(/[a-z]+/gi, '')),
    // colStart: sheetData['!ref'].split(':')[0].replace(/\d+/gi, ''),
    // colEnd: sheetData['!ref'].split(':')[1].replace(/\d+/gi, ''),
    // margins: sheetData['!margins']
  }

  // delete sheetData['!ref']
  // delete sheetData['!margins']

  // const cols = Object.keys(sheetData).map(key => key.replace(/\d+/gi, ''))
  // const uniqueCols = [...new Set(cols)]
  // const sortedCols = mergeSort(uniqueCols)

  const {
    rangeStart,
    rangeEnd,
    ulTrigger,
    ulTriggerZero,
    ulTransform,
    olTrigger,
    olTransform
  } = settings

  const asdf = Object.entries(sheetData).reduce((acc, cur, ind) => {
    const temp = acc

    const [address, { v, t, w }] = cur

    const rowId = address.replace(/[a-z]+/gi, '')
    const colId = address.replace(/\d+/gi, '')

    const ulPattern = new RegExp(`^\\${ulTrigger}\\s*?\\d*(\\.\\d*)?$`)
    const olPattern = new RegExp(`^\\${olTrigger}\\s*?\\d*(\\.\\d*)?$`)

    const meta = {
      address,
      rowId,
      colId,
      original: v
    }

    if (ulTriggerZero.length !== '' && v && t === 's' && v === ulTriggerZero) {
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

    return temp
  }, {})

  console.log('%c asdf', 'color: yellow; font-size: large', asdf)
}
