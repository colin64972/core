export function parseValidationRules(fields) {
  return fields.reduce((acc, cur) => {
    acc[cur.name] = cur.validation
    return acc
  }, {})
}

export function setOrderButtonLabel(form, dirty, valid, value) {
  if (!dirty || !valid) {
    return 'Submit Order'
  }
  if (form === 'buyOrder') {
    return `Submit Order at ${value} ETH`
  }
  if (form === 'sellOrder') {
    return `Submit Order for ${value} ETH`
  }
}
