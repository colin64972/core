export const fromBase26 = alpha => {
  const letters = alpha.split('')

  let out = 0

  for (let i = 0; i < letters.length; i++) {
    out += (letters[letters.length - 1 - i].charCodeAt() - 96) * Math.pow(26, i)
  }

  return out
}

export const toBase26 = decimal => {
  let out = ''

  while (true) {
    out = String.fromCharCode(((decimal - 1) % 26) + 97) + out
    decimal = Math.floor((decimal - 1) / 26)

    if (decimal === 0) {
      break
    }
  }

  return out
}
