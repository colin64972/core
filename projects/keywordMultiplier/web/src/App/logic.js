import moment from 'moment'
import { createHashId } from '@colin30/shared/react/helpers'
import { constants } from './constants'

export const prepSetValue = input => {
  // TODO update set parsing rules
  const split = input.replace(/\r|\n/g, 'A1B2C3').split('A1B2C3')
  return [...new Set(split)].join('\n')
}

const changeSetNameToLabel = data => data.substr(-1)

export const removeSetPrefix = data => parseInt(data.substr(-1), 10)

const prepPostedSets = data => {
  const { sets } = data
  if (typeof sets !== 'object') throw new Error('api did not return data')
  const headings = []
  const result = Object.keys(sets).reduce((acc, cur, ind) => {
    headings.push(changeSetNameToLabel(cur))
    const temp = acc
    temp[String.fromCharCode(ind + 97)] = {
      set: removeSetPrefix(cur),
      data: sets[cur].split('\n')
    }
    return temp
  }, {})
  result.count = Object.keys(sets).length
  result.heading = headings.join(' x ')
  result.id = data.id
  return result
}

const multiplysets = preppedSets => {
  const result = {
    heading: preppedSets.heading,
    list: [],
    id: preppedSets.id
  }
  switch (preppedSets.count) {
    case 5:
      for (let a of preppedSets.a.data) {
        for (let b of preppedSets.b.data) {
          for (let c of preppedSets.c.data) {
            for (let d of preppedSets.d.data) {
              for (let e of preppedSets.e.data) {
                result.list.push(`${a} ${b} ${c} ${d} ${e}`)
              }
            }
          }
        }
      }
      break
    case 4:
      for (let a of preppedSets.a.data) {
        for (let b of preppedSets.b.data) {
          for (let c of preppedSets.c.data) {
            for (let d of preppedSets.d.data) {
              result.list.push(`${a} ${b} ${c} ${d}`)
            }
          }
        }
      }
      break
    case 3:
      for (let a of preppedSets.a.data) {
        for (let b of preppedSets.b.data) {
          for (let c of preppedSets.c.data) {
            result.list.push(`${a} ${b} ${c}`)
          }
        }
      }
      break
    default:
      for (let a of preppedSets.a.data) {
        for (let b of preppedSets.b.data) {
          result.list.push(`${a} ${b}`)
        }
      }
      break
  }
  return result
}

export const processTrial = postedData => {
  const preppedSets = prepPostedSets(postedData)
  return multiplysets(preppedSets)
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
