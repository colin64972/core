export const setupAbis = (abis, networkId, contract) =>
  abis.reduce(
    (acc, cur) => {
      let result = acc
      result[0][cur.contractName] = cur
      try {
        result[1][cur.contractName] = new contract(
          cur.abi,
          cur.networks[networkId].address
        )
      } catch (error) {
        throw Error(error)
      }
      return result
    },
    [{}, {}]
  )

export const runContractMethod = async (
  kind,
  contract,
  method,
  params,
  sendCallOptions
) => {
  try {
    const callMethod = contract.methods[method]
    let result
    if (kind === 'send') {
      result = await callMethod(...params).send(sendCallOptions)
    } else {
      result = await callMethod(...params).call(sendCallOptions)
    }
    return result
  } catch (error) {
    return error
  }
}

export const fetchEventStream = async (contract, eventType) => {
  const stream = await contract.getPastEvents(eventType, {
    fromBlock: 0,
    toBlock: 'latest'
  })
  return stream.map(event => event.returnValues)
}

export const fetchCachedItems = (count, method) => {
  const promises = []
  for (let i = 0; i < count; i += 1) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const result = await method.call(this, i).call()
        return resolve(result)
      } catch (error) {
        return reject(error)
      }
    })
    promises.push(promise)
  }
  return Promise.all(promises)
}
