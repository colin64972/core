import { transformFunctionValues } from '@cjo3/dlc-web/src/constants'
import {
  DataUrlCollection,
  JSSStyleObject,
  ScopeRange,
  TransformImageData,
  TransformResult,
  TransformResultCell,
  TransformResultCellCollection,
  TransformSettings,
  TransformSummary
} from '@cjo3/dlc-web/src/store/editor/interfaces'
import * as XLSX from 'xlsx'
import { deduplicate, mergeSort } from '../general/sorting'
import { EXCEL_CELL_ADDRESS } from '../raw/constants/regex'
import { sortAddresses } from '../react/xlsx'

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

  const comment = [
    {
      a: 'asdf',
      t: value
    }
  ]

  switch (kind) {
    case transformFunctionValues.leave:
      temp = value.replace(trigger, '')
      return {
        v: temp,
        t: 's',
        c: comment
      }

    case transformFunctionValues.halve:
      temp = value.replace(trigger, '')
      const halved = parseFloat(temp) / 2
      return {
        t: 'n',
        v: halved,
        c: comment,
        z: setSigFigFormat(value, halved)
      }

    case transformFunctionValues.zero:
      return {
        t: 'n',
        v: 0,
        c: comment
      }

    case transformFunctionValues.none:
      return {
        t: 's',
        v: value,
        c: comment
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
    const ulPattern = new RegExp(`\\${ulTrigger}\\s*?\\d*(\\.\\d*)?`, 'i')
    const olPattern = new RegExp(`\\${olTrigger}\\s*?\\d*(\\.\\d*)?`, 'i')

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
        const oValue = cell.meta.original.w || cell.meta.original.v
        temp[cell.meta.original.w] = {
          addresses: [cur],
          original: {
            dark: createPngDataUrl(oValue.toString().trim()),
            light: createPngDataUrl(oValue.toString().trim(), '#fafafa')
          },
          transform: {
            light: createPngDataUrl(cell.w, '#fafafa'),
            dark: createPngDataUrl(cell.w)
          }
        }
      }
      return temp
    },
    {}
  )

  return {
    count,
    originalValues: mergeSort(originalStrings),
    transformValues: mergeSort(transformedStrings),
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
): TransformImageData => {
  const fontSize = 14

  if (process.env.IS_SERVER)
    return {
      url: '',
      width: 0,
      height: 0
    }

  const canvas = require('canvas')

  const canvas1 = canvas.createCanvas(100, 40)
  const ctx1 = canvas1.getContext('2d')
  ctx1.font = `${fontSize}px Arial`
  ctx1.textAlign = 'center'
  let { width } = ctx1.measureText(text)

  width += 14
  let height = fontSize + 14

  const canvas2 = canvas.createCanvas(width, height)
  const ctx2 = canvas2.getContext('2d')
  ctx2.font = '14px Arial'
  ctx2.textAlign = 'center'
  ctx2.fillStyle = color
  ctx2.fillText(text, width / 2, fontSize + 5, width)

  return {
    url: canvas2.toDataURL(),
    width,
    height
  }
}

export const exportFile = (
  sheetData: XLSX.Sheet,
  transformResults: TransformResultCellCollection,
  currentSheetName: string,
  workbookName: string,
  bookType: string,
  ext: string
): void => {
  try {
    const output = mergeResults(sheetData, transformResults)

    let outputSheetName: string = `${currentSheetName}-edited`.substring(0, 31)

    const wb: XLSX.WorkBook = {
      Sheets: { [outputSheetName]: output },
      SheetNames: [outputSheetName]
    }

    const file: string = workbookName.substring(
      0,
      workbookName.lastIndexOf('.')
    )

    return XLSX.writeFile(wb, `${file}-edited.${ext}`, {
      type: 'file',
      bookType,
      cellDates: true,
      compression: true
    })
  } catch (error) {
    throw error
  }
}

export const setTransformStyle = (
  imageData: TransformImageData,
  borderColor?: string
): JSSStyleObject => {
  const style = {
    userSelect: 'none',
    msUserSelect: 'none',
    OUserSelect: 'none',
    MozUserSelect: 'none',
    KhtmlUserSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
    width: imageData.width,
    height: imageData.height,
    boxSizing: 'content-box',
    backgroundImage: `url(${imageData.url})`,
    backgroundPosition: 'center',
    backgroundSize: 'initial',
    backgroundRepeat: 'no-repeat'
  }

  if (borderColor) {
    style.border = `1px solid ${borderColor}`
    style.borderRadius = 4
  }

  return style
}

const mergeResults = (
  sheet: XLSX.Sheet,
  transforms: TransformResultCellCollection
): XLSX.Sheet => {
  const result = Object.keys(sheet).reduce((acc, cur) => {
    let temp: XLSX.Sheet = acc

    if (!transforms[cur]) {
      temp[cur] = sheet[cur]
    } else {
      temp[cur] = transforms[cur]
      temp[cur].c.hidden = true
    }

    return temp
  }, {})

  return result
}
