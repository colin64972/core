import Web3 from 'web3'

const setAbisConnection = (abis, networkId, connection) =>
  abis.reduce(
    (acc, cur) => {
      let result = acc
      result[0][cur.contractName] = cur
      try {
        result[1][cur.contractName] = new connection.eth.Contract(
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

export const connectWeb3 = async (fallbackUrl, contractAbis) => {
  // use the Web3.givenProvider by the browser via the selected network and account from MetaMask
  // uses the supplied fallback url only if the default Web3.givenProvider is not found by the browser
  const connection = new Web3(Web3.givenProvider || fallbackUrl)
  const network = {
    providerUrl: connection.givenProvider,
    fallbackUrl,
    type: await connection.eth.net.getNetworkType(),
    id: await connection.eth.net.getId()
  }
  const accounts = await connection.eth.getAccounts()
  const [abis, contracts] = setAbisConnection(
    contractAbis,
    network.id,
    connection
  )
  return {
    connection,
    network,
    accounts,
    abis,
    contracts
  }
}

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
