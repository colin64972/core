import moment from 'moment'
import { createHashId, optionizeObject } from '@colin30/shared/react/helpers'
import { DOMAIN_WITH_TLD } from '@colin30/shared/raw/constants/regex'
import { KeConstants } from '@colin30/shared/raw/constants/keywordMultiplier'
import { stripe } from '@colin30/shared/raw/constants/stripe'

const removeAllButSpaces = line =>
  line
    .toLowerCase()
    .trim()
    .split(/\s+/gi)
    .map(word => word.replace(/[^a-z0-9]+/gi, ''))
    .join(' ')

const removeAllButTld = line => line.replace(DOMAIN_WITH_TLD, '$2')

export const prepSetValue = input => {
  const split = input
    .trim()
    .replace(/[\n\r]+/gi, '\n')
    .split(/\n/gi)

  const nonWordsRemoved = split.map(line => {
    let temp = removeAllButSpaces(line)
    if (DOMAIN_WITH_TLD.test(line)) {
      temp = removeAllButTld(line)
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
      case KeConstants.WHITESPACE_OPTIONS.NONE.VALUE:
        result = value.replace(/\s+/g, '')
        break
      case KeConstants.WHITESPACE_OPTIONS.HYPHEN.VALUE:
        result = value.replace(/\s+/g, '-')
        break
      case KeConstants.WHITESPACE_OPTIONS.UNDERSCORE.VALUE:
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
      case KeConstants.MATCHTYPES.BROAD_MODIFIER:
        result = value.replace(/(\w\B\w+)/g, '+$1').replace(/\.\+/, '+.')
        break
      case KeConstants.MATCHTYPES.PHRASE:
        result = `"${value}"`
        break
      case KeConstants.MATCHTYPES.EXACT:
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
      if (matchType === KeConstants.MATCHTYPES.BROAD_MODIFIER) {
        result += `${tableBody.id}\t${row.firstChild.innerHTML}\t${KeConstants.EXCEL_TEXT_QUALIFIER}${row.firstChild.nextSibling.innerHTML}\n`
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
  kind = KeConstants.NOTICE.KINDS.SIMPLE
) => {
  const result = {
    id: createHashId(),
    kind,
    bg: KeConstants.NOTICE.BGS.PASS,
    heading: 'Success',
    message,
    choice: null,
    moment: moment()
  }
  if (kind !== KeConstants.NOTICE.KINDS.SIMPLE) {
    result.bg = KeConstants.NOTICE.BGS.WARN
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
  timestamp: moment(data.createdAt).format('HH:mm:ss'),
  clientIp: {
    ip: '139.99.131.38',
    type: 'ipv4',
    continent_code: 'OC',
    continent_name: 'Oceania',
    country_code: 'AU',
    country_name: 'Australia',
    region_code: 'NSW',
    region_name: 'New South Wales',
    city: 'Sydney',
    zip: '2060',
    latitude: -33.839969635009766,
    longitude: 151.19581604003906,
    location: {
      geoname_id: 2147714,
      capital: 'Canberra',
      languages: [
        {
          code: 'en',
          name: 'English',
          native: 'English'
        }
      ],
      country_flag: 'http://assets.ipstack.com/flags/au.svg',
      country_flag_emoji: '🇦🇺',
      country_flag_emoji_unicode: 'U+1F1E6 U+1F1FA',
      calling_code: '61',
      is_eu: false
    }
  },
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
    case KeConstants.VOLUME_DATA.CPC.LABEL:
      return asdf[field.value].value
    case KeConstants.VOLUME_DATA.TREND.LABEL:
      return createTrendChart(asdf[field.value])
    default:
      return asdf[field.value]
  }
}

const formatToDollars = input => {
  const cents = Math.round(input)
  const dollars = cents / 100
  const stringVal = dollars.toString()
  return stringVal.substring(0, stringVal.lastIndexOf('.') + 3)
}

export const calculateTrialPrice = itemCount => {
  const preStripe = itemCount * KeConstants.VOLUME_DATA.KEYWORD_PRICE
  const stripeVariable = preStripe * stripe.VARIABLE_RATE
  const withStripeFixed = preStripe + stripeVariable + stripe.FIXED
  const result = formatToDollars(withStripeFixed)
  return result
}
