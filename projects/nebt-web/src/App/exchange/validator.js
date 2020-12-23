export const validate = (values, props) => {
  const { validationRules } = props

  let errors = Object.keys(values).reduce((acc, cur) => {
    let errAcc = acc
    const testValue = values[cur]
    const rules = validationRules[cur]
    rules.forEach(rule => {
      if (rule.required === true && (!testValue || testValue.length < 1)) {
        errAcc[cur] = {
          hasError: true,
          message: rule.message,
        }
      }
      if (rule.greaterThan === 0 && testValue <= rule.greaterThan) {
        errAcc[cur] = {
          hasError: true,
          message: rule.message,
        }
      }
      if (
        rule.dependentField &&
        rule.dependentField.length > 0 &&
        (!values[rule.dependentField] || values[rule.dependentField] <= 0)
      ) {
        errAcc[cur] = {
          hasError: true,
          message: rule.message,
        }
      }
    })
    return errAcc
  }, {})

  return errors
}
