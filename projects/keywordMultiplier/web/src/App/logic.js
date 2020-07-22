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
  timestamp: moment(data.createdAt).format('HH:mm:ss'),
  geoIp: data?.geoIp,
  createdAt: data.createdAt,
  volumeData: data?.volumeData
  // volumeData: [
  //   {
  //     vol: 150,
  //     cpc: {
  //       currency: '$',
  //       value: '3.77'
  //     },
  //     keyword: 'asdf asdf',
  //     competition: 0.03,
  //     trend: [
  //       {
  //         month: 'May',
  //         year: 2019,
  //         value: 480
  //       },
  //       {
  //         month: 'June',
  //         year: 2019,
  //         value: 480
  //       },
  //       {
  //         month: 'July',
  //         year: 2019,
  //         value: 390
  //       },
  //       {
  //         month: 'August',
  //         year: 2019,
  //         value: 480
  //       },
  //       {
  //         month: 'September',
  //         year: 2019,
  //         value: 390
  //       },
  //       {
  //         month: 'October',
  //         year: 2019,
  //         value: 390
  //       },
  //       {
  //         month: 'November',
  //         year: 2019,
  //         value: 320
  //       },
  //       {
  //         month: 'December',
  //         year: 2019,
  //         value: 480
  //       },
  //       {
  //         month: 'January',
  //         year: 2020,
  //         value: 390
  //       },
  //       {
  //         month: 'February',
  //         year: 2020,
  //         value: 390
  //       },
  //       {
  //         month: 'March',
  //         year: 2020,
  //         value: 480
  //       },
  //       {
  //         month: 'April',
  //         year: 2020,
  //         value: 480
  //       }
  //     ]
  //   }
  // ]
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

const createTrendChart = dataPoints => JSON.stringify(dataPoints)

export const setVolumeFieldCell = (asdf, field) => {
  switch (field.label) {
    case constants.VOLUME_DATA.CPC.LABEL:
      return asdf[field.value].value
    case constants.VOLUME_DATA.TREND.LABEL:
      return createTrendChart(asdf[field.value])
    default:
      return asdf[field.value]
  }
}
