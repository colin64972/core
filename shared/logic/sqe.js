import moment from 'moment'
import { constants } from '../raw/constants/sqe'
import { LINE_INCLUDES_TLD } from '../raw/constants/regex'
import { createHashId, optionizeObject } from '../react/helpers'
import { stripe } from '../raw/constants/stripe'
import { formatCentsToDollars } from '../general/formatting'

export const calculateTrialPrice = itemCount => {
  const result = {}

  let bumpUpFee = 0
  if (itemCount < constants.VOLUME_DATA.MIN_ITEM_COUNT) {
    bumpUpFee =
      (constants.VOLUME_DATA.MIN_ITEM_COUNT - itemCount) *
      constants.VOLUME_DATA.KEYWORD_PRICE
  }
  const metricsCost = itemCount * constants.VOLUME_DATA.KEYWORD_PRICE
  const beforeFee = metricsCost + bumpUpFee
  const processingFee = beforeFee * stripe.VARIABLE_RATE + stripe.FIXED
  const total = beforeFee + processingFee

  result.unitPrice = formatCentsToDollars(constants.VOLUME_DATA.KEYWORD_PRICE)
  result.metricsCost = formatCentsToDollars(metricsCost)
  result.bumpUpFee = formatCentsToDollars(bumpUpFee)
  result.processingFee = formatCentsToDollars(processingFee)
  result.total = formatCentsToDollars(total)

  return result
}

export const takeLastTld = line =>
  line.replace(LINE_INCLUDES_TLD, '$2').trim().toLowerCase()

export const takeKewordsFromTld = line =>
  line.replace(LINE_INCLUDES_TLD, '$1').trim().toLowerCase()

export const parseBillableKeywords = fullList => {
  const reduced = fullList.reduce((acc, cur) => {
    const temp = acc
    let result = cur
    if (LINE_INCLUDES_TLD.test(cur)) {
      result = takeKewordsFromTld(cur)
    }
    temp.push(result)
    return temp
  }, [])

  return [...new Set(reduced)]
}

export const findMetricFromEntry = (keyword, field, volumes) => {
  let searchItem = keyword
  if (LINE_INCLUDES_TLD.test(keyword)) {
    searchItem = takeKewordsFromTld(keyword)
  }
  const metric = volumes.find(item => item.keyword === searchItem)
  let result = ''
  if (field === constants.VOLUME_DATA.CPC.VALUE) {
    result = parseFloat(metric[field].value)
  } else {
    result = metric[field]
  }
  return JSON.stringify(result)
}

export const buildCopyData = (inputRef, keywordsOnly) => {
  let builtData = null
  if (inputRef.length) {
    const tableRefs = inputRef
    const stringifiedTables = []
    for (let tableRef of tableRefs) {
      stringifiedTables.push(stringifyTable(tableRef, keywordsOnly))
    }
    const allTablesString = stringifiedTables.join('\n\n')
    builtData = allTablesString
  } else {
    const tableRef = inputRef
    const tableString = stringifyTable(tableRef, keywordsOnly)
    builtData = tableString
  }

  return builtData
}

const stringifyHeadCells = headCells => {
  let headings = ['Trial Id']

  for (let headCell of headCells) {
    headings.push(headCell.getAttribute('scope'))
  }

  return headings.join('\t')
}

const stringifyBodyRows = (bodyRows, keywordsOnly, trialId) => {
  const rowsArray = []

  for (let bodyRow of bodyRows) {
    let rowCells = bodyRow.children

    let rowArray = []

    let rowString = ''

    if (keywordsOnly) {
      rowArray.push(bodyRow.firstChild.nextSibling.innerHTML)
    } else {
      rowArray.push(trialId)

      for (let rowCell of rowCells) {
        if (
          rowCell.getAttribute('scope') ===
            constants.VOLUME_DATA.VOLUME.VALUE &&
          /\W/gi.test(rowCell.innerHTML)
        ) {
          rowArray.push('Available to Order')
        } else {
          rowArray.push(rowCell.innerHTML)
        }
      }
    }

    rowString = rowArray.join('\t')

    rowsArray.push(rowString)
  }

  return rowsArray.join('\n')
}

const stringifyTable = (tableRef, keywordsOnly) => {
  let result = ''

  const tableMeta = JSON.parse(tableRef.getAttribute('scope'))
  const { trialId, metricOptions } = tableMeta

  const hasMetrics = Object.values(metricOptions).length > 0

  if (!keywordsOnly) {
    if (hasMetrics) {
      result += `Target Country\t${metricOptions.country}\nCPC Currency\t${metricOptions.currency}\nData Source\t${metricOptions.dataSource}\n`
    }
    result += stringifyHeadCells(tableRef.firstChild.firstChild.children) + '\n'
  }

  result += stringifyBodyRows(
    tableRef.lastChild.children,
    keywordsOnly,
    trialId
  )

  return result
}

export const setInitialCountry = (previousSelection, ipCountry) => {
  if (previousSelection) return previousSelection
  if (/^gb$/i.test(ipCountry)) return 'uk'
  return ipCountry.toLowerCase()
}

const alphaCodeSetKeys = setData =>
  Object.keys(setData).reduce((acc, cur, ind) => {
    const temp = acc
    temp[String.fromCharCode(ind + 97)] = setData[cur].split('\n')
    return temp
  }, {})

const setList = setData => {
  const alphaCoded = alphaCodeSetKeys(setData)

  const list = []

  switch (Object.keys(alphaCoded).length) {
    case 5:
      for (let a of alphaCoded.a) {
        for (let b of alphaCoded.b) {
          for (let c of alphaCoded.c) {
            for (let d of alphaCoded.d) {
              for (let e of alphaCoded.e) {
                list.push(`${a} ${b} ${c} ${d} ${e}`)
              }
            }
          }
        }
      }
      break
    case 4:
      for (let a of alphaCoded.a) {
        for (let b of alphaCoded.b) {
          for (let c of alphaCoded.c) {
            for (let d of alphaCoded.d) {
              list.push(`${a} ${b} ${c} ${d}`)
            }
          }
        }
      }
      break
    case 3:
      for (let a of alphaCoded.a) {
        for (let b of alphaCoded.b) {
          for (let c of alphaCoded.c) {
            list.push(`${a} ${b} ${c}`)
          }
        }
      }
      break
    default:
      for (let a of alphaCoded.a) {
        for (let b of alphaCoded.b) {
          list.push(`${a} ${b}`)
        }
      }
      break
  }

  return list
}

export const processTrial = setData => {
  const result = {}
  const wholeList = setList(setData)
  try {
    result.heading = Object.keys(setData)
      .join(' x ')
      .replace(/setField/gi, '')
    result.list = wholeList
    result.billableKeywords = parseBillableKeywords(wholeList)
  } catch (error) {
    console.error('error', error)
  }
  return result
}

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

export const formatProductLine = (
  value,
  matchType,
  whiteSpaceCode,
  tldsHidden
) => {
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
    let matchTypeValue = value
    if (tldsHidden) {
      matchTypeValue = takeKewordsFromTld(matchTypeValue)
    }
    switch (matchType) {
      case constants.MATCHTYPES.BROAD_MODIFIER:
        result = matchTypeValue
          .replace(/(\w\B\w+)/g, '+$1')
          .replace(/\.\+/, '+.')
        break
      case constants.MATCHTYPES.PHRASE:
        result = `"${matchTypeValue}"`
        break
      case constants.MATCHTYPES.EXACT:
        result = `[${matchTypeValue}]`
        break
      default:
        result = matchTypeValue
    }
  }

  if (tldsHidden) return takeKewordsFromTld(result)

  return result
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
  timestampUpdated: moment(data.updatedAt).format('HH:mm:ss'),
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
