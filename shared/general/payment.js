export const billingCountryNotCanada = countryCode => {
  if (!countryCode) return null
  if (countryCode.toLowerCase() === 'ca') return false
  return true
}

export const getBillingCurrency = countryCode => {}
