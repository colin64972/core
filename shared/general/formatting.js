export const formatCentsToDollars = input => {
  const cents = parseInt(input)
  const dollars = cents / 100
  const stringVal = dollars.toString()
  if (stringVal.lastIndexOf('.') < 0) return `${stringVal}.00`
  if (stringVal.length > 3) return stringVal
  if (stringVal.length > 2) return `${stringVal}0`
}
