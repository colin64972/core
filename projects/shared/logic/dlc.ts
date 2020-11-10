import XLSX from 'xlsx'
import { mergeSort } from '@cjo3/shared/general/sorting'
import { transformFunctionValues } from '@cjo3/dlc-web/src/constants'

const fromBase26 = alpha => {
  const letters = alpha.split('')

  let out = 0

  for (let i = 0; i < letters.length; i++) {
    out += (letters[letters.length - 1 - i].charCodeAt() - 96) * Math.pow(26, i)
  }

  return out
}

const toBase26 = decimal => {
  let out = ''

  while (true) {
    out = String.fromCharCode(((decimal - 1) % 26) + 97) + out
    decimal = Math.floor((decimal - 1) / 26)

    if (decimal === 0) {
      break
    }
  }

  return out
}

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

const upToZ = (startCode, prefix = '', endAt = null) => {
  const result = []
  for (let i = startCode || 65; i <= 90; i += 1) {
    let temp = `${prefix}${String.fromCharCode(i)}`
    if (endAt && temp === endAt) {
      result.push(temp)
      return result
    }
    result.push(temp)
  }
  return result
}

const buildTargetRange = (start, end) => {
  // console.log('%c XXX', 'color: yellow; font-size: large', start, end)
  const colStart = start.replace(/\d+/gi, '')
  const colEnd = end.replace(/\d+/gi, '')
  // const rowStart = start.replace(/[a-z]+/gi, '')
  // const rowEnd = end.replace(/[a-z]+/gi, '')
  // const colStartCode = colStart.charCodeAt(0)
  // let result = [
  //   ...upToZ(colStartCode, '', colEnd),
  //   ...upToZ(null, 'A', colEnd),
  //   ...upToZ(null, 'B', colEnd),
  //   ...upToZ(null, 'C', colEnd)
  // ]

  console.log(
    '%c buildTargetRange',
    'color: yellow; font-size: large',
    fromBase26(colStart),
    fromBase26(colEnd)
  )
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

  // buildTargetRange(rangeStart, rangeEnd)

  // return

  const sheetData = sheet

  const sheetMeta = {
    rowStart: parseInt(sheetData['!ref'].split(':')[0].replace(/[a-z]+/gi, '')),
    rowEnd: parseInt(sheetData['!ref'].split(':')[1].replace(/[a-z]+/gi, '')),
    colStart: sheetData['!ref'].split(':')[0].replace(/\d+/gi, ''),
    colEnd: sheetData['!ref'].split(':')[1].replace(/\d+/gi, ''),
    margins: sheetData['!margins']
  }

  delete sheetData['!ref']
  delete sheetData['!margins']

  const codeKeys = Object.keys(sheetData).map(key => {
    const col = key.replace(/\d+/gi, '').toLowerCase()
    return fromBase26(col)
  })

  const sortedKeys = mergeSort([...new Set(codeKeys)])

  // const colStartCode = fromBase26(sheetMeta.colStart.toLowerCase())
  // const colEndCode = fromBase26(sheetMeta.colEnd.toLowerCase())

  const start = rangeStart.match(/(?<colStart>[a-z]+)(?<rowStart>\d+)/i)
  const { colStart, rowStart } = start.groups
  const end = rangeEnd.match(/(?<colEnd>[a-z]+)(?<rowEnd>\d+)/i)
  const { colEnd, rowEnd } = end.groups
  const colStartCode = fromBase26(colStart.toLowerCase())
  const colEndCode = fromBase26(colEnd.toLowerCase())

  console.log(mergeSort(Object.keys(sheetData)))

  // const cols = Object.keys(sheetData).map(key => key.replace(/\d+/gi, ''))
  // const uniqueCols = [...new Set(cols)]
  // const sortedCols = mergeSort(uniqueCols)

  // const cellInScope = address => {
  //   const match = address.match(/(?<col>[a-z]+)(?<row>\d+)/i)
  //   const { col, row } = match.groups
  // const start = rangeStart.match(/(?<colStart>[a-z]+)(?<rowStart>\d+)/i)
  // const { colStart, rowStart } = start.groups
  // const end = rangeEnd.match(/(?<colEnd>[a-z]+)(?<rowEnd>\d+)/i)
  // const { colEnd, rowEnd } = end.groups
  //   if (
  //     parseInt(row) >= parseInt(rowStart) &&
  //     parseInt(row) <= parseInt(rowEnd)
  //   ) {
  //     const startCode = colStart.toUpperCase().charCodeAt(0)
  //     const endCode = colEnd.toUpperCase().charCodeAt(0)
  //     console.log(
  //       '%c row',
  //       'color: yellow; font-size: large',
  //       colStart,
  //       col,
  //       colEnd
  //     )
  //   }
  // }

  let targetCells = Object.entries(sheetData)

  const asdf = targetCells.reduce((acc, cur, ind) => {
    const temp = acc

    const [address, { v, t, w }] = cur

    // cellInScope(address)

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
