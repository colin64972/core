import { formatCentsToDollars } from '../general/formatting'
import { constants } from '../raw/constants/keywordMultiplier'
import { LINE_INCLUDES_TLD } from '../raw/constants/regex'
import { stripe } from '../raw/constants/stripe'

import { billingCountryNotCanada } from '../general/payment'

export const calculateTrialPrice = (itemCount, billingCountry = null) => {
  const result = {}

  const metricUnitPrice = constants.VOLUME_DATA.KEYWORD_PRICE
  const metricsCost = itemCount * constants.VOLUME_DATA.KEYWORD_PRICE
  const processingFee = metricsCost * stripe.VARIABLE_RATE + stripe.FIXED
  const subtotal = metricsCost + processingFee
  const total = subtotal
  const intFeeRate =
    stripe.INTERNATIONAL_CARD_RATE + stripe.CURRENCY_CONVERSION_RATE
  const intFee = subtotal * intFeeRate
  const intTotal = subtotal + intFee

  result.unitPrice = formatCentsToDollars(metricUnitPrice)
  result.metricsCost = formatCentsToDollars(metricsCost)
  result.processingFee = formatCentsToDollars(processingFee)
  result.subtotal = formatCentsToDollars(subtotal)
  result.total = formatCentsToDollars(total)

  if (billingCountryNotCanada(billingCountry)) {
    result.intFee = formatCentsToDollars(intFee)
    result.intTotal = formatCentsToDollars(intTotal)
  }

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
