import moment from 'moment'
import { createHashId } from '@colin30/shared/react/helpers'
import { constants } from './constants'

export const prepSetValue = input => {
  const split = input
    .replace(/[\n\r]+/gi, constants.REPLACEMENT_CODE)
    .replace(/\s+/gi, '')
    .split(constants.REPLACEMENT_CODE)

  const nonWordsRemoved = split.map(line => {
    let temp
    if (/^\.(\w+)$/.test(line)) {
      temp = line
    } else {
      temp = line.replace(/[-_\W]+/gi, '')
    }
    return temp.trim().toLowerCase()
  })
  const uniqueSet = new Set(nonWordsRemoved)
  return [...uniqueSet].join('\n').replace(/\n$/, '')
}

export const formatProductLine = (value, matchType, whiteSpaceCode) => {
  let result = ''
  if (whiteSpaceCode) {
    switch (whiteSpaceCode) {
      case constants.WHITESPACE_OPTIONS.NONE.VALUE:
        result = value.replace(/\s+/g, '')
        break
      case constants.WHITESPACE_OPTIONS.HYPHEN.VALUE:
        result = value.replace(/\s+/g, '-')
        break
      case constants.WHITESPACE_OPTIONS.UNDERSCORE.VALUE:
        result = value.replace(/\s+/g, '_')
        break
      default:
        result = value
    }

    if (result.match(/^(.*)[-_]+\.+(\w+)$/)) {
      result = result.replace(/[-_]+\.+/gi, '.')
    }
  } else {
    switch (matchType) {
      case constants.MATCHTYPES.BROAD_MODIFIER:
        result = value.replace(/(\w\B\w+)/g, '+$1').replace(/\.\+/, '+.')
        break
      case constants.MATCHTYPES.PHRASE:
        result = `"${value}"`
        break
      case constants.MATCHTYPES.EXACT:
        result = `[${value}]`
        break
      default:
        result = value
    }
  }
  return result
}

const buildCopyData = (tableBody, dataOnly, matchType) => {
  let result = ''
  const tableRows = tableBody.children
  for (let row of tableRows) {
    if (dataOnly) {
      result += `${row.firstChild.nextSibling.innerHTML}\n`
    } else {
      if (matchType === constants.MATCHTYPES.BROAD_MODIFIER) {
        result += `${tableBody.id}\t${row.firstChild.innerHTML}\t${constants.EXCEL_TEXT_QUALIFIER}${row.firstChild.nextSibling.innerHTML}\n`
      } else {
        result += `${tableBody.id}\t${row.firstChild.innerHTML}\t${row.firstChild.nextSibling.innerHTML}\n`
      }
    }
  }
  return result
}

const setCopyValue = (input, dataOnly, matchType) => {
  let result = ''
  try {
    for (let tableBody of input) {
      result += buildCopyData(tableBody, dataOnly, matchType)
    }
  } catch {
    result += buildCopyData(input, dataOnly, matchType)
  }
  return result
}

export const copyToClipboard = (input, dataOnly, matchType) => {
  let value = dataOnly ? '' : `Trial ID\tEntry\tProduct\n`
  try {
    let container = document.createElement('textarea')
    container.value = value + setCopyValue(input, dataOnly, matchType)
    document.body.appendChild(container)
    container.select()
    document.execCommand('copy')
    document.body.removeChild(container)
  } catch (error) {
    console.error('%c error', 'color: yellow; font-size: large', error.message)
    throw error
  }
}

export const generateNotice = (
  message,
  kind = constants.NOTICE.KINDS.SIMPLE
) => {
  const result = {
    id: createHashId(),
    kind,
    bg: constants.NOTICE.BGS.PASS,
    heading: 'Success',
    message,
    choice: null,
    moment: moment()
  }
  if (kind !== constants.NOTICE.KINDS.SIMPLE) {
    result.bg = constants.NOTICE.BGS.WARN
    result.heading = 'Warning'
  }
  return result
}
