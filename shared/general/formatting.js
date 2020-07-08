export const formatToDollars = input => {
  const cents = Math.round(input)
  const dollars = cents / 100
  const stringVal = dollars.toString()
  return stringVal.substring(0, stringVal.lastIndexOf('.') + 3)
}
