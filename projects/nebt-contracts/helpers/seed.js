require('dotenv').config()
const Token = artifacts.require('Token')
const Exchange = artifacts.require('Exchange')
// const Web3 = require('web3')
const faker = require('faker')
const { setEther, setTokens, wait } = require('./')
const { ETHER_ADDRESS } = require('./constants')

const setRandomNebAmount = () => faker.finance.amount(0.00001, 10, 5)
const setRandomEthAmount = () => faker.finance.amount(0.00001, 10, 5)

module.exports = async callback => {
  try {
    console.log('Script Starting')

    const accounts = await web3.eth.getAccounts()
    console.log('Accounts', accounts)
    const user1 = accounts[0]
    const user2 = accounts[1]

    const token = await Token.deployed()
    console.log('Token Contract Address', token.address)

    const exchange = await Exchange.deployed()
    console.log('Exchange Contract Address', exchange.address)

    let amount = 100
    await token.transfer(user2, setEther(amount), { from: user1 })
    console.log(`Transferred ${amount} ether from ${user1} to ${user2}`)

    amount = 100
    await exchange.depositEther({ from: user1, value: setEther(amount) })
    console.log(`Deposited ${amount} Ether from ${user1}`)

    amount = 100
    await token.approve(exchange.address, setTokens(amount), { from: user2 })
    console.log(`Approved ${amount} tokens from ${user2}`)

    await exchange.depositToken(token.address, setTokens(amount), {
      from: user2,
    })
    console.log(`Deposited ${amount} tokens from ${user2}`)

    // Seed a Cancelled Order

    let result
    let orderId
    result = await exchange.makeOrder(
      token.address,
      setTokens(setRandomNebAmount()),
      ETHER_ADDRESS,
      setEther(setRandomEthAmount()),
      { from: user1 }
    )
    console.log(`Made order from ${user1}`)

    orderId = result.logs[0].args.id
    await exchange.cancelOrder(orderId, { from: user1 })
    console.log(`Cancelled order ${orderId} from ${user1}`)

    // Seed Filled Orders

    result = await exchange.makeOrder(
      token.address,
      setTokens(setRandomNebAmount()),
      ETHER_ADDRESS,
      setEther(setRandomEthAmount()),
      { from: user1 }
    )
    console.log(`Made order from ${user1}`)

    orderId = result.logs[0].args.id
    await exchange.fillOrder(orderId, { from: user2 })
    console.log(`Filled order from ${user1}`)

    await wait(1)

    result = await exchange.makeOrder(
      token.address,
      setTokens(setRandomNebAmount()),
      ETHER_ADDRESS,
      setEther(setRandomEthAmount()),
      { from: user1 }
    )
    console.log(`Made order from ${user1}`)

    orderId = result.logs[0].args.id
    await exchange.fillOrder(orderId, { from: user2 })
    console.log(`Filled order from ${user1}`)

    await wait(1)

    result = await exchange.makeOrder(
      token.address,
      setTokens(setRandomNebAmount()),
      ETHER_ADDRESS,
      setEther(setRandomEthAmount()),
      { from: user1 }
    )
    console.log(`Made order from ${user1}`)
    orderId = result.logs[0].args.id

    await exchange.fillOrder(orderId, { from: user2 })
    console.log(`Filled order from ${user1}`)

    await wait(1)

    // Seed More Filled Orders

    for (let i = 0; i < 5; i += 1) {
      let result = await exchange.makeOrder(
        token.address,
        setTokens(setRandomNebAmount()),
        ETHER_ADDRESS,
        setEther(setRandomEthAmount()),
        { from: user1 }
      )
      console.log(`Made order ${i} from ${user1}`)
      orderId = result.logs[0].args.id
      await exchange.fillOrder(orderId, { from: user2 })
      console.log(`Filled order ${i} from ${user2}`)
      await wait(1)
    }

    for (let i = 0; i < 5; i += 1) {
      let result = await exchange.makeOrder(
        token.address,
        setTokens(setRandomNebAmount()),
        ETHER_ADDRESS,
        setEther(setRandomEthAmount()),
        { from: user2 }
      )
      console.log(`Made order ${i} from ${user2}`)
      orderId = result.logs[0].args.id
      await exchange.fillOrder(orderId, { from: user1 })
      console.log(`Filled order ${i} from ${user1}`)
      await wait(1)
    }

    // Seed Open Orders
    for (let i = 1; i <= 5; i++) {
      result = await exchange.makeOrder(
        token.address,
        setTokens(setRandomNebAmount()),
        ETHER_ADDRESS,
        setEther(setRandomEthAmount()),
        { from: user1 }
      )
      console.log(`Made order from ${user1}`)
      await wait(1)
    }

    for (let i = 1; i <= 5; i++) {
      result = await exchange.makeOrder(
        ETHER_ADDRESS,
        setEther(setRandomEthAmount()),
        token.address,
        setTokens(setRandomNebAmount()),
        { from: user2 }
      )
      console.log(`Made order from ${user2}`)
      await wait(1)
    }
  } catch (error) {
    console.error('Error', error)
  }
  callback()
}
