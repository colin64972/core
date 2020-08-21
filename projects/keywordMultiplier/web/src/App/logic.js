import moment from 'moment'
import { createHashId, optionizeObject } from '@colin30/shared/react/helpers'
import { LINE_INCLUDES_TLD } from '@colin30/shared/raw/constants/regex'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'
import { takeLastTld } from '@colin30/shared/logic/keywordMultiplier'

const removeAllButSpaces = line =>
  line
    .toLowerCase()
    .trim()
    .split(/\s+/gi)
    .map(word => word.replace(/[^a-z0-9]+/gi, ''))
    .join(' ')

export const prepSetValue = input => {
  const split = input
    .trim()
    .replace(/[\n\r]+/gi, '\n')
    .split(/\n/gi)

  const nonWordsRemoved = split.map(line => {
    let temp = removeAllButSpaces(line)
    if (LINE_INCLUDES_TLD.test(line)) {
      temp = takeLastTld(line)
    }
    return temp
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

const buildCopyData = (tableBody, keywordsOnly, matchType) => {
  let result = ''
  const tableRows = tableBody.children
  for (let row of tableRows) {
    if (keywordsOnly) {
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

const setCopyValue = (inputRef, keywordsOnly, matchType) => {
  let result = ''
  try {
    for (let tableBody of inputRef) {
      result += buildCopyData(tableBody, keywordsOnly, matchType)
    }
  } catch {
    result += buildCopyData(inputRef, keywordsOnly, matchType)
  }
  return result
}

export const copyToClipboard = (inputRef, keywordsOnly, matchType) => {
  let value = keywordsOnly ? '' : `Trial ID\tEntry\tProduct\n`
  try {
    let container = document.createElement('textarea')
    container.value = value + setCopyValue(inputRef, keywordsOnly, matchType)
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

export const decorateKeOptions = data => ({
  countries: optionizeObject(data.countries).map(item => {
    if (item.label === 'Global') {
      item.value = 'global'
    }
    return item
  }),
  currencies: optionizeObject(data.currencies).filter(
    item => item.value !== ''
  ),
  dataSources: optionizeObject({
    gkp: 'Google Keyword Planner',
    cli: 'GKP + Clickstream'
  })
})

export const decorateTrial = data => ({
  id: data.id,
  heading: data.trialProduct.heading,
  list: data.trialProduct.list,
  billableKeywords: data.trialProduct.billableKeywords,
  geoIp: data?.geoIp,
  updatedAt: data.updatedAt,
  timestamp: moment(data.updatedAt).format('HH:mm:ss'),
  metrics: data?.metrics,
  paymentId: data?.paymentId
})

export const getSetsWithValues = values =>
  Object.entries(values).reduce((acc, cur) => {
    let temp = acc
    const [key, val] = cur
    if (val !== '') {
      temp.push(key)
    }
    return temp
  }, [])

export const findEnabledSets = (filled, disabled, values) =>
  filled.reduce((acc, cur) => {
    let temp = acc
    if (!disabled.includes(cur)) {
      temp[cur] = values[cur]
    }
    return temp
  }, {})
