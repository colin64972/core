import { transformFunctionValues } from '@cjo3/dlc-web/src/constants'
import {
  ScopeRange,
  TransformResult,
  TransformSettings,
  TransformSummary
} from '@cjo3/dlc-web/src/store/editor/interfaces'
import { WorkSheet } from 'xlsx'
import { fromBase26 } from '../general/conversion'
import { deduplicate, mergeSort } from '../general/sorting'

const setResult = (kind: string, value: string, trigger?: string) => {
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

const parseCellAddress = (address: string): [string, string] => {
  const col = address.replace(/\d+/gi, '')
  const row = address.replace(/[a-z]+/gi, '')
  return [col, row]
}

const parseSheetRange = (range: string): ScopeRange => {
  const [start, end] = range.split(':')
  const [startCol, startRow] = parseCellAddress(start)
  const [endCol, endRow] = parseCellAddress(end)
  return {
    start: {
      colId: startCol,
      colNum: fromBase26(startCol.toLowerCase()),
      rowNum: parseInt(startRow)
    },
    end: {
      colId: endCol,
      colNum: fromBase26(endCol.toLowerCase()),
      rowNum: parseInt(endRow)
    }
  }
}

const setSheetScope = (
  rangeStart: string,
  rangeEnd: string,
  sheetRange: string
) => {
  const sourceRange = parseSheetRange(sheetRange)

  if (rangeStart.length && rangeEnd.length)
    return parseSheetRange(`${rangeStart}:${rangeEnd}`)

  return sourceRange
}

const checkInScope = (
  address: string,
  scope: ScopeRange
): { colNum: number; rowNum: number; isInScope: boolean } => {
  const [colId, rowId] = parseCellAddress(address)
  const colNum = fromBase26(colId.toLowerCase())
  const rowNum = parseInt(rowId)
  const isInScope =
    colNum >= scope.start.colNum &&
    colNum <= scope.end.colNum &&
    rowNum >= scope.start.rowNum &&
    rowNum <= scope.end.rowNum

  return {
    colNum,
    rowNum,
    isInScope
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

  const sheetData = {
    ...sheet
  }

  const scope = setSheetScope(rangeStart, rangeEnd, sheet['!ref'])

  delete sheetData['!ref']
  delete sheetData['!margins']

  const transformed = Object.entries(sheetData).reduce((acc, cur, ind) => {
    const temp = acc

    const [address, { v, t, w }] = cur

    const { colNum, rowNum, isInScope } = checkInScope(address, scope)

    if (isInScope) {
      const ulPattern = new RegExp(`^\\${ulTrigger}\\s*?\\d*(\\.\\d*)?$`)
      const olPattern = new RegExp(`^\\${olTrigger}\\s*?\\d*(\\.\\d*)?$`)

      const meta = {
        address,
        colNum,
        rowNum,
        original: v
      }

      if (v && t === 's' && v === ulTriggerZero) {
        temp[address] = {
          ...meta,
          transformKind: 'zero',
          trigger: ulTriggerZero,
          result: setResult('zero', v, ulTriggerZero)
        }
        return temp
      }

      if (t === 's' && ulPattern.test(v)) {
        temp[address] = {
          ...meta,
          transformKind: 'ul',
          trigger: ulTrigger,
          result: setResult(ulTransform, v, ulTrigger)
        }
        return temp
      }

      if (t === 's' && olPattern.test(v)) {
        temp[address] = {
          ...meta,
          transformKind: 'ol',
          trigger: olTrigger,
          result: setResult(olTransform, v, olTrigger)
        }
        return temp
      }
    }

    return temp
  }, {})

  return {
    ul: collectChanges('ul', transformed),
    ol: collectChanges('ol', transformed),
    zero: collectChanges('zero', transformed),
    all: transformed
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

  return {
    count,
    originalValues: mergeSort(originalValues),
    changedValues: mergeSort(changedValues),
    addresses: mergeSort(addresses)
  }
}

export const setWaitTime = (waitTime: number): number => {
  if (process.env.NODE_ENV === 'development') return 500
  if (waitTime < 1000) return 1000
  if (waitTime > 5000) return 5000
  return waitTime
}
