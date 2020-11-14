import { transformFunctionValues } from '@cjo3/dlc-web/src/constants'
import {
  DataUrlCollection,
  ScopeRange,
  TransformResult,
  TransformResultCell,
  TransformResultCellCollection,
  TransformSettings,
  TransformSummary,
  TransformValue
} from '@cjo3/dlc-web/src/store/editor/interfaces'
import { createCanvas } from 'canvas'
import * as XLSX from 'xlsx'
import { deduplicate, mergeSort } from '../general/sorting'
import { EXCEL_CELL_ADDRESS } from '../raw/constants/regex'
import { convertSheetOptions, sortAddresses } from '../react/xlsx'

const splitFloats = (value: string): string => {
  const splitIndex = value.lastIndexOf('.')
  if (splitIndex > 0) return value.substring(splitIndex + 1)
  return null
}

const setSigFigFormat = (original: string, transformed: number): string => {
  const oFloats = splitFloats(original)
  const tFloats = splitFloats(transformed.toString())

  if (oFloats && tFloats) {
    if (tFloats.length >= oFloats.length)
      return `0.${'0'.repeat(tFloats.length)}`
    return `0.${'0'.repeat(oFloats.length)}`
  }

  if (oFloats) return `0.${'0'.repeat(oFloats.length)}`
}

const setTransformValue = (
  kind: string,
  value: string,
  trigger?: string
): XLSX.CellObject => {
  let temp

  switch (kind) {
    case transformFunctionValues.leave:
      temp = value.replace(trigger, '')
      return {
        v: temp,
        t: 's'
      }

    case transformFunctionValues.halve:
      temp = value.replace(trigger, '')
      const halved = parseFloat(temp) / 2
      return {
        t: 'n',
        v: halved,
        z: setSigFigFormat(value, halved)
      }

    case transformFunctionValues.zero:
      return {
        t: 'n',
        v: 0
      }

    case transformFunctionValues.none:
      return {
        t: 's',
        v: value
      }
  }
}

const getDataCellAddresses = sheet => {
  const result = Object.keys(sheet).filter(entry =>
    EXCEL_CELL_ADDRESS.test(entry)
  )
  return sortAddresses(result)
}

export const processSheet = (
  sheet: XLSX.WorkSheet,
  {
    rangeStart,
    rangeEnd,
    ulTrigger,
    ulTriggerZero,
    ulTransform,
    olTrigger,
    olTransform
  }: TransformSettings
): TransformResult => {
  if (!sheet) return null

  const ref: string = sheet['!ref']

  const sheetAddresses: string[] = getDataCellAddresses(sheet)

  const requestedScope: string =
    rangeStart && rangeEnd ? `${rangeStart}:${rangeEnd}` : ref

  const scope: ScopeRange = XLSX.utils.decode_range(requestedScope)

  const isInScope = (address: string, scope: ScopeRange): boolean => {
    const { c, r } = XLSX.utils.decode_cell(address)
    return r >= scope.s.r && r <= scope.e.r && c >= scope.s.c && c <= scope.e.c
  }

  const processCell = (
    address: string,
    cell: XLSX.CellObject
  ): TransformResultCell => {
    const ulPattern = new RegExp(`\\${ulTrigger}\\s*?\\d*(\\.\\d*)?`)
    const olPattern = new RegExp(`\\${olTrigger}\\s*?\\d*(\\.\\d*)?`)

    const cellValue: string = cell.v.toString().trim()

    let result: TransformResultCell = {
      t: '',
      v: '',
      w: '',
      meta: {
        address,
        coordinates: XLSX.utils.decode_cell(address),
        caseType: '',
        trigger: '',
        original: {
          ...cell
        }
      }
    }

    if (cellValue === ulTriggerZero) {
      const transform: XLSX.CellObject = setTransformValue(
        transformFunctionValues.zero,
        cellValue
      )

      const transformW: string = XLSX.utils.format_cell(transform)

      result = {
        ...transform,
        w: transformW,
        meta: {
          ...result.meta,
          caseType: transformFunctionValues.zero,
          trigger: ulTriggerZero
        }
      }

      return result
    }

    if (ulPattern.test(cellValue)) {
      const transform: XLSX.CellObject = setTransformValue(
        ulTransform,
        cellValue,
        ulTrigger
      )

      const transformW: string = XLSX.utils.format_cell(transform)

      result = {
        ...transform,
        w: transformW,
        meta: {
          ...result.meta,
          caseType: 'ul',
          trigger: ulTrigger
        }
      }

      return result
    }

    if (olPattern.test(cellValue)) {
      const transform: XLSX.CellObject = setTransformValue(
        olTransform,
        cellValue,
        olTrigger
      )

      const transformW: string = XLSX.utils.format_cell(transform)

      result = {
        ...transform,
        w: transformW,
        meta: {
          ...result.meta,
          caseType: 'ol',
          trigger: olTrigger
        }
      }

      return result
    }
  }

  const transforms: TransformResultCellCollection = sheetAddresses.reduce(
    (
      acc: TransformResultCellCollection,
      cur: string
    ): TransformResultCellCollection => {
      let temp = acc

      const cell: XLSX.CellObject = sheet[cur]

      if (cell.t === 's' && cell.w !== '' && isInScope(cur, scope)) {
        temp[cur] = processCell(cur, cell)
      }

      return temp
    },
    {}
  )

  return {
    ul: collectChanges('ul', transforms),
    ol: collectChanges('ol', transforms),
    zero: collectChanges('zero', transforms),
    all: transforms,
    scope
  }
}

export const collectChanges = (
  caseType: string,
  data: TransformResultCellCollection
): TransformSummary => {
  const filtered: TransformResultCell[] = Object.values(data).filter(
    (item: TransformResultCell) => item && item.meta.caseType === caseType
  )

  const count: number = filtered.length

  const originalStrings: string[] = deduplicate(
    filtered.map((item: TransformResultCell): string => item.meta.original.w)
  )
  const transformedStrings: string[] = deduplicate(
    filtered.map((item: TransformResultCell): string => item.w)
  )
  const addresses: string[] = deduplicate(
    filtered.map((item: TransformResultCell): string => item.meta.address)
  )

  const dataUrls = addresses.reduce(
    (acc: DataUrlCollection, cur: string): DataUrlCollection => {
      let temp: DataUrlCollection = acc

      const cell: TransformResultCell = data[cur]

      if (temp[cell.meta.original.w]) {
        temp[cell.meta.original.w].addresses.push(cur)
      } else {
        temp[cell.meta.original.w] = {
          addresses: [cur],
          original: createPngDataUrl(cell.meta.original.w),
          transform: createPngDataUrl(cell.w),
          transformWhite: createPngDataUrl(cell.w, '#fafafa', 'left')
        }
      }
      return temp
    },
    {}
  )

  return {
    count,
    originalValues: mergeSort(originalStrings),
    changedValues: mergeSort(transformedStrings),
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

export const createPngDataUrl = (
  text: string,
  color: string = '#444444'
): string => {
  const canvas = createCanvas(100, 40)
  const ctx = canvas.getContext('2d')
  ctx.font = '14px Arial'
  ctx.textAlign = 'center'
  ctx.fillStyle = color
  ctx.fillText(text, 49, 24, 100)
  return canvas.toDataURL()
}

export const buildCopyData = (
  sheet: WorkSheet,
  results: TransformResult
): string => {
  const { ul, ol, zero, all } = results

  const options = {
    ...convertSheetOptions,
    header: 'A'
  }

  const rows = utils.sheet_to_csv(sheet, options)
}
