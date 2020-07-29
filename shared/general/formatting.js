export const formatCentsToDollars = input => {
  const cents = parseInt(input)
  const dollars = cents / 100
  let stringVal = dollars.toString()
  if (stringVal.length < 4) {
    stringVal = stringVal.padEnd(4, '0')
  }
  return stringVal.substring(0, stringVal.lastIndexOf('.') + 3)
}
