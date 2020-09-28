const alphaCodeSetKeys = setData =>
  Object.keys(setData).reduce((acc, cur, ind) => {
    const temp = acc
    temp[String.fromCharCode(ind + 97)] = setData[cur].split('\n')
    return temp
  }, {})

const setList = setData => {
  const alphaCoded = alphaCodeSetKeys(setData)

  const list = []

  switch (Object.keys(alphaCoded).length) {
    case 5:
      for (let a of alphaCoded.a) {
        for (let b of alphaCoded.b) {
          for (let c of alphaCoded.c) {
            for (let d of alphaCoded.d) {
              for (let e of alphaCoded.e) {
                list.push(`${a} ${b} ${c} ${d} ${e}`)
              }
            }
          }
        }
      }
      break
    case 4:
      for (let a of alphaCoded.a) {
        for (let b of alphaCoded.b) {
          for (let c of alphaCoded.c) {
            for (let d of alphaCoded.d) {
              list.push(`${a} ${b} ${c} ${d}`)
            }
          }
        }
      }
      break
    case 3:
      for (let a of alphaCoded.a) {
        for (let b of alphaCoded.b) {
          for (let c of alphaCoded.c) {
            list.push(`${a} ${b} ${c}`)
          }
        }
      }
      break
    default:
      for (let a of alphaCoded.a) {
        for (let b of alphaCoded.b) {
          list.push(`${a} ${b}`)
        }
      }
      break
  }

  return list
}

export const processTrial = setData => {
  const result = {}
  try {
    result.heading = Object.keys(setData)
      .join(' x ')
      .replace(/setField/gi, '')
    result.list = setList(setData)
  } catch (error) {
    console.log('error', error)
  }
  return result
}
