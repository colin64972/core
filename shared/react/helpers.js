import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

export const createHashId = () => {
  const hash = crypto.createHash('sha256')
  hash.update(uuidv4())
  return hash.digest('hex').substr(0, 10)
}

export const optionizeObject = input =>
  Object.entries(input).reduce(
    (acc, cur) => [
      ...acc,
      {
        key: createHashId(),
        value: cur[0],
        label: cur[1]
      }
    ],
    []
  )

export const setExpMonthOptions = () => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  return months.map((month, ind) => ({
    key: createHashId(),
    label: month,
    value: ind + 1
  }))
}

export const setExpYearOptions = () => {
  const minYear = new Date().getFullYear()
  const options = []
  for (let i = minYear; i < minYear + 10; i += 1) {
    options.push({
      key: createHashId(),
      label: i,
      value: i
    })
  }
  return options
}

export const getLabelFromValue = (value, source) => {
  if (source && Array.isArray(source)) {
    const found = source.find(item => item.value === value)
    console.log('%c found', 'color: yellow; font-size: large', found)
    return found?.label
  }
  return value
}
