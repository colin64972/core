import { transformFunctionValues } from '@cjo3/dlc-web/src/constants'
import { createCanvas } from 'canvas'
import {
  TransformResult,
  TransformResultCell,
  TransformSettings,
  TransformSummary,
  CellValue
} from '@cjo3/dlc-web/src/store/editor/interfaces'
import { WorkSheet } from 'xlsx'
import { deduplicate, mergeSort } from '../general/sorting'
import { convertSheet, setCellAddress, sortAddresses } from '../react/xlsx'

const splitFloats = (value: string): string => {
  const splitIndex = value.lastIndexOf('.')
  if (splitIndex > 0) return value.substring(splitIndex + 1)
  return null
}

const checkSigFigs = (value: string, halved: number): string => {
  const floats = splitFloats(value)
  if (floats) {
    const sigFigs = floats.length
    const halvedFloats = splitFloats(halved.toString())
    const halvedSigFigs = halvedFloats ? halvedFloats.length : 0
    if (halvedSigFigs < sigFigs) {
      let temp = halved.toString()
      temp += '.'
      temp += '0'.repeat(sigFigs)
      return temp
    }
  }
  return halved.toString()
}

const setCellValue = (original: string, replaced: string): CellValue => {
  const floats = splitFloats(original)
  const result: CellValue = {
    t: '',
    v: '',
    w: replaced
  }
  if (floats) {
    result.t = 's'
    result.v = replaced
  } else {
    result.t = 'n'
    result.v = parseInt(replaced)
  }
  return result
}

const setResult = (
  kind: string,
  value: string,
  trigger?: string
): CellValue => {
  let temp

  switch (kind) {
    case transformFunctionValues.leave:
      temp = value.trim().replace(trigger, '')
      return setCellValue(value, temp)

    case transformFunctionValues.halve:
      temp = value.trim().replace(trigger, '')
      const halved = parseFloat(temp) / 2
      const withSigFigs = checkSigFigs(value, halved)
      return setCellValue(value, withSigFigs)

    case transformFunctionValues.zero:
      return {
        t: 'n',
        v: 0,
        w: '0'
      }

    case transformFunctionValues.none:
      const v = value.toString().trim()
      return {
        t: 's',
        v,
        w: v
      }
  }
}

export const processSheet = (
  sheet: WorkSheet,
  settings: TransformSettings
): TransformResult => {
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

  const scope =
    rangeStart && rangeEnd ? `${rangeStart}:${rangeEnd}` : sheet['!ref']

  const sheetRows = convertSheet(sheet, scope)

  const transformed = sheetRows.reduce(
    (acc, row, rowIndex: number): TransformResult => {
      const temp = acc

      row.forEach(
        (cell: string, cellIndex: number): TransformResultCell => {
          if (typeof cell !== 'string') return temp

          const ulPattern = new RegExp(`\\${ulTrigger}\\s*?\\d*(\\.\\d*)?`)
          const olPattern = new RegExp(`\\${olTrigger}\\s*?\\d*(\\.\\d*)?`)

          const { rowStartNum, colStartNum, address } = setCellAddress(
            rangeStart,
            rowIndex,
            cellIndex
          )

          const meta = {
            address,
            rowIndex,
            cellIndex,
            rowStartNum,
            colStartNum,
            original: cell
          }

          if (ulTriggerZero !== '' && cell === ulTriggerZero) {
            temp[address] = {
              ...meta,
              transformKind: 'zero',
              trigger: ulTriggerZero,
              result: setResult('zero', cell, ulTriggerZero)
            }
            return temp
          }

          if (ulPattern.test(cell)) {
            temp[address] = {
              ...meta,
              transformKind: 'ul',
              trigger: ulTrigger,
              result: setResult(ulTransform, cell, ulTrigger)
            }
            return temp
          }

          if (olPattern.test(cell)) {
            temp[address] = {
              ...meta,
              transformKind: 'ol',
              trigger: olTrigger,
              result: setResult(olTransform, cell, olTrigger)
            }
            return temp
          }
        }
      )

      return temp
    },
    {}
  )

  return {
    ul: collectChanges('ul', transformed),
    ol: collectChanges('ol', transformed),
    zero: collectChanges('zero', transformed),
    all: transformed,
    scope
  }
}

export const collectChanges = (
  kind: string,
  data: TransformResult
): TransformSummary => {
  const filtered = Object.entries(data).filter(
    entry => entry[1].transformKind === kind
  )

  const count = filtered.length
  const originalValues = deduplicate(filtered.map(item => item[1].original))
  const changedValues = deduplicate(filtered.map(item => item[1].result.w))
  const addresses = deduplicate(filtered.map(item => item[0]))

  const dataUrls = addresses.reduce((acc, cur) => {
    let temp = acc

    const cell = data[cur]

    if (temp[cell.original]) {
      temp[cell.original].addresses.push(cur)
    } else {
      temp[cell.original] = {
        addresses: [],
        original: createPngDataUrl(cell.original),
        transform: createPngDataUrl(cell.result.w)
      }
    }

    return temp
  }, {})

  return {
    count,
    originalValues: mergeSort(originalValues),
    changedValues: mergeSort(changedValues),
    addresses: sortAddresses(addresses),
    dataUrls
  }
}

export const setWaitTime = (waitTime: number): number => {
  if (process.env.NODE_ENV === 'development') return 500
  if (waitTime < 1000) return 1000
  if (waitTime > 5000) return 5000
  return waitTime
}

export const createPngDataUrl = (text: string): string => {
  const canvas = createCanvas(100, 40)
  const ctx = canvas.getContext('2d')
  ctx.font = '14px Arial'
  ctx.textAlign = 'center'
  ctx.fillStyle = '#444444'
  ctx.fillText(text, 49, 24, 100)
  return canvas.toDataURL()
}
