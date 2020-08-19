import { formatCentsToDollars } from '../general/formatting'
import { constants } from '../raw/constants/keywordMultiplier'
import { LINE_INCLUDES_TLD } from '../raw/constants/regex'
import { stripe } from '../raw/constants/stripe'

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
