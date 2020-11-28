export const formatCentsToDollars = input => {
  const cents = parseInt(input)
  const dollars = cents / 100
  const stringVal = dollars.toString()
  if (stringVal.lastIndexOf('.') < 0) return `${stringVal}.00`
  if (stringVal.length > 3) return stringVal
  if (stringVal.length > 2) return `${stringVal}0`
}

const addLeadingZero = input => (input < 10 ? `0${input}` : input.toString())

export const formatTime = input => {
  const date = new Date(input)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const time = `${addLeadingZero(hours)}:${addLeadingZero(
    minutes
  )}:${addLeadingZero(seconds)}`
  return time
}
