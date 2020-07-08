import { formatToDollars } from '../general/formatting'
import { constants } from '../raw/constants/keywordMultiplier'
import { stripe } from '../raw/constants/stripe'

export const calculateTrialPrice = itemCount => {
  const preStripe = itemCount * constants.VOLUME_DATA.KEYWORD_PRICE
  const stripeVariable = preStripe * stripe.VARIABLE_RATE
  const withStripeFixed = preStripe + stripeVariable + stripe.FIXED
  const result = formatToDollars(withStripeFixed)
  return result
}
