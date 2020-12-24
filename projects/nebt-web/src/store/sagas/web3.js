import { call, put, select } from 'redux-saga/effects'
import { runContractMethod, fetchEventStream, setupAbis } from './helpers'
import TokenAbi from '@cjo3/nebt-contracts/build/contracts/Token'
import ExchangeAbi from '@cjo3/nebt-contracts/build/contracts/Exchange'
import {
  selectContract,
  selectUserAccount,
  selectConnection,
  selectCurrencyAccount,
  selectWithdrawValue,
  selectBalances,
  selectOrderQuantity,
  selectAllOrders,
  selectBuyOrderValue,
  selectSellOrderValue
} from '../selectors'
import types from '../types'
import { ETHER_ADDRESS } from '@cjo3/shared/raw/constants/web3'
import { formatBalance, checkIsDuplicateOrder } from '../helpers'
import Web3 from 'web3'

export function* connectToDapp(action) {
  try {
    const { windowEthereum } = action

    let connection

    if (!windowEthereum) throw new Error('no ethereum provider')

    window.web3 = new Web3(windowEthereum)

    window.ethereum.enable()

    connection = window.web3

    const accounts = yield call(connection.eth.getAccounts)

    const networkType = yield call(connection.eth.net.getNetworkType)

    const networkId = yield call(connection.eth.net.getId)

    const [abis, contracts] = yield call(
      setupAbis,
      [TokenAbi, ExchangeAbi],
      networkId,
      connection.eth.Contract
    )

    yield put({
      type: types.SET_ACCOUNTS,
      accounts
    })

    yield put({
      type: types.SET_CONNECTION,
      connection
    })

    yield put({
      type: types.SET_ABIS,
      abis
    })

    yield put({
      type: types.SET_CONTRACTS,
      contracts: {
        loadedCount: Object.keys(contracts).length,
        ...contracts
      }
    })

    yield put({
      type: types.SET_NETWORK,
      network: {
        type: networkType,
        id: networkId
      }
    })

    yield put({
      type: types.CONNECT_DAPP_PASS,
      status: 'pass',
      message: 'Connected to dapp ok'
    })
  } catch (error) {
    console.error('%c connectWallet', 'color: red; font-size: large', error)
    yield put({
      type: types.CONNECT_DAPP_FAIL,
      status: 'fail',
      message: 'Failed to connect to dapp'
    })
  }
}

export function* tryFetchingOrders(action) {
  try {
    const contract = yield select(state => selectContract(state, 'Exchange'))
    if (!contract) throw new Error('No contracts loaded')
    const orders = yield call(fetchEventStream, contract, 'Order')
    yield put({
      type: types.SET_ORDERS,
      orders
    })
    const filled = yield call(fetchEventStream, contract, 'Trade')
    yield put({
      type: types.SET_FILLED_ORDERS,
      orders: filled
    })
    const cancelled = yield call(fetchEventStream, contract, 'Cancel')
    yield put({
      type: types.SET_CANCELLED_ORDERS,
      orders: cancelled
    })
    yield put({
      type: types.TRY_FETCHING_ORDERS_PASS,
      status: 'pass',
      message: 'Orders loaded successfully'
    })
  } catch (error) {
    return yield put({
      type: types.TRY_FETCHING_ORDERS_FAIL,
      status: 'fail',
      message: error.message
    })
  }
}

export function* tryCancellingOrder(action) {
  try {
    yield put({
      type: types.SET_WORKING_SPINNER,
      status: true,
      kind: 'isLoadingOpenOrders'
    })
    const contract = yield select(state => selectContract(state, 'Exchange'))
    if (!contract) throw new Error('No contracts loaded')
    const account = yield select(state => selectUserAccount(state))
    const result = yield call(
      runContractMethod,
      'send',
      contract,
      'cancelOrder',
      [action.orderId],
      { from: account }
    )
    yield put({
      type: types.ADD_CANCELLED_ORDER,
      order: result.events.Cancel.returnValues
    })
    yield put({
      type: types.TRY_CANCELLING_ORDER_PASS,
      status: 'pass',
      message: `Order ${action.orderId} cancelled successfully`
    })
    return yield put({
      type: types.SET_WORKING_SPINNER,
      status: false,
      kind: 'isLoadingOpenOrders'
    })
  } catch (error) {
    yield put({
      type: types.TRY_CANCELLING_ORDER_FAIL,
      status: 'fail',
      message: error.message
    })
    return yield put({
      type: types.SET_WORKING_SPINNER,
      status: false,
      kind: 'isLoadingOpenOrders'
    })
  }
}

export function* tryFillingOrder(action) {
  try {
    yield put({
      type: types.SET_WORKING_SPINNER,
      status: true,
      kind: 'isLoadingOrderBook'
    })
    const contract = yield select(state => selectContract(state, 'Exchange'))
    const account = yield select(state => selectUserAccount(state))
    const currentBalances = yield select(state => selectBalances(state))
    if (!account) throw new Error('No account found')
    if (!contract) throw new Error('No contracts found')
    if (!currentBalances) throw new Error('No current balances found')
    const result = yield call(
      runContractMethod,
      'send',
      contract,
      'fillOrder',
      [action.id],
      { from: account }
    )
    const filledOrder = result.events.Trade.returnValues
    yield put({
      type: types.ADD_FILLED_ORDER,
      order: filledOrder
    })
    let newExchangeNebBalance = 0
    let newExchangeEthBalance = 0
    if (filledOrder.tokenGet === ETHER_ADDRESS) {
      newExchangeNebBalance =
        currentBalances.neb.exchange + formatBalance(filledOrder.amountGive)
      newExchangeEthBalance =
        currentBalances.eth.exchange - formatBalance(filledOrder.amountGet)
    } else {
      newExchangeNebBalance =
        currentBalances.neb.exchange - formatBalance(filledOrder.amountGet)
      newExchangeEthBalance =
        currentBalances.eth.exchange + formatBalance(filledOrder.amountGive)
    }
    yield put({
      type: types.UPDATE_BALANCES,
      balances: {
        neb: {
          ...currentBalances.neb,
          exchange: newExchangeNebBalance
        },
        eth: {
          ...currentBalances.eth,
          exchange: newExchangeEthBalance
        }
      }
    })
    yield put({
      type: types.TRY_FILLING_ORDER_PASS,
      status: 'pass',
      message: `Order ${filledOrder.id} filled successfully`
    })
    return yield put({
      type: types.SET_WORKING_SPINNER,
      status: false,
      kind: 'isLoadingOrderBook'
    })
  } catch (error) {
    yield put({
      type: types.TRY_FILLING_ORDER_FAIL,
      status: 'fail',
      message: error.message
    })
    return yield put({
      type: types.SET_WORKING_SPINNER,
      status: false,
      kind: 'isLoadingOrderBook'
    })
  }
}

export function* tryFetchingBalances(action) {
  try {
    yield put({
      type: types.SET_WORKING_SPINNER,
      status: true,
      kind: 'isLoadingBalances'
    })
    const exchangeContract = yield select(state =>
      selectContract(state, 'Exchange')
    )
    const tokenContract = yield select(state => selectContract(state, 'Token'))
    const account = yield select(state => selectUserAccount(state))
    const connection = yield select(state => selectConnection(state))
    if (!exchangeContract || !tokenContract || !account || !connection)
      throw new Error('No connection, account or contracts available')
    const accountNebCount = yield call(
      runContractMethod,
      'call',
      tokenContract,
      'balanceOf',
      [account],
      null
    )
    const accountEthCount = yield call(connection.eth.getBalance, account)
    const exchangeNebCount = yield call(
      runContractMethod,
      'call',
      exchangeContract,
      'balanceOf',
      [tokenContract.options.address, account],
      null
    )
    const exchangeEthCount = yield call(
      runContractMethod,
      'call',
      exchangeContract,
      'balanceOf',
      [ETHER_ADDRESS, account],
      null
    )
    const balances = {
      eth: {
        account: formatBalance(accountEthCount),
        exchange: formatBalance(exchangeEthCount)
      },
      neb: {
        account: formatBalance(accountNebCount),
        exchange: formatBalance(exchangeNebCount)
      }
    }
    yield put({
      type: types.UPDATE_BALANCES,
      balances
    })
    yield put({
      type: types.TRY_FECTHING_BALANCES_PASS,
      status: 'pass',
      message: `Balances loaded successfully`
    })
    return yield put({
      type: types.SET_WORKING_SPINNER,
      status: false,
      kind: 'isLoadingBalances'
    })
  } catch (error) {
    yield put({
      type: types.TRY_FECTHING_BALANCES_FAIL,
      status: 'fail',
      message: error.message
    })
    return yield put({
      type: types.SET_WORKING_SPINNER,
      status: false,
      kind: 'isLoadingBalances'
    })
  }
}

export function* tryWithdrawing(action) {
  try {
    yield put({
      type: types.SET_WORKING_SPINNER,
      status: true,
      kind: 'isWithdrawing'
    })
    const account = yield select(state => selectUserAccount(state))
    const contract = yield select(state => selectContract(state, 'Exchange'))
    const connection = yield select(state => selectConnection(state))
    const currentBalances = yield select(state => selectBalances(state))
    const value = yield select(state =>
      selectWithdrawValue(state, action.formName)
    )
    if (!account || !contract || !connection || !value)
      throw new Error('No data loaded')
    const weiValue = connection.utils.toWei(value, 'ether')
    let result
    if (action.currency === 'eth') {
      result = yield call(
        runContractMethod,
        'send',
        contract,
        'withdrawEther',
        [weiValue],
        { from: account }
      )
      const { balance } = result.events.Withdraw.returnValues
      yield put({
        type: types.UPDATE_BALANCES,
        balances: {
          ...currentBalances,
          eth: {
            account:
              currentBalances[action.currency].account + parseFloat(value),
            exchange: formatBalance(balance)
          }
        }
      })
    } else {
      let currencyAccount = yield select(state =>
        selectCurrencyAccount(state, action.currency)
      )
      result = yield call(
        runContractMethod,
        'send',
        contract,
        'withdrawToken',
        [currencyAccount, weiValue],
        { from: account }
      )
      const { balance } = result.events.Withdraw.returnValues
      yield put({
        type: types.UPDATE_BALANCES,
        balances: {
          ...currentBalances,
          neb: {
            account:
              currentBalances[action.currency].account + parseFloat(value),
            exchange: formatBalance(balance)
          }
        }
      })
    }
    yield put({
      type: types.TRY_WITHDRAWING_PASS,
      status: 'pass',
      message: `${action.currency.toUpperCase()} withdraw successful`
    })
    return yield put({
      type: types.SET_WORKING_SPINNER,
      status: false,
      kind: 'isWithdrawing'
    })
  } catch (error) {
    yield put({
      type: types.TRY_WITHDRAWING_FAIL,
      status: 'fail',
      message: error.message
    })
    return yield put({
      type: types.SET_WORKING_SPINNER,
      status: false,
      kind: 'isWithdrawing'
    })
  }
}

export function* tryDepositing(action) {
  try {
    yield put({
      type: types.SET_WORKING_SPINNER,
      status: true,
      kind: 'isDepositing'
    })
    const account = yield select(state => selectUserAccount(state))
    const exchangeContract = yield select(state =>
      selectContract(state, 'Exchange')
    )
    const tokenContract = yield select(state => selectContract(state, 'Token'))
    const connection = yield select(state => selectConnection(state))
    const currentBalances = yield select(state => selectBalances(state))
    const value = yield select(state =>
      selectWithdrawValue(state, action.formName)
    )
    if (
      !account ||
      !exchangeContract ||
      !tokenContract ||
      !connection ||
      !value
    )
      throw new Error('No data loaded')
    const weiValue = connection.utils.toWei(value, 'ether')
    let result
    if (action.currency === 'eth') {
      result = yield call(
        runContractMethod,
        'send',
        exchangeContract,
        'depositEther',
        [],
        { from: account, value: weiValue }
      )
      const { balance } = result.events.Deposit.returnValues
      yield put({
        type: types.UPDATE_BALANCES,
        balances: {
          ...currentBalances,
          eth: {
            account:
              currentBalances[action.currency].account - parseFloat(value),
            exchange: formatBalance(balance)
          }
        }
      })
    } else {
      result = yield call(
        runContractMethod,
        'send',
        tokenContract,
        'approve',
        [exchangeContract.options.address, weiValue],
        { from: account }
      )
      const { spender } = result.events.Approval.returnValues
      const approvedValue = result.events.Approval.returnValues.value
      if (spender !== exchangeContract.options.address)
        throw new Error('Exchange approval failed')
      result = yield call(
        runContractMethod,
        'send',
        exchangeContract,
        'depositToken',
        [tokenContract.options.address, approvedValue],
        { from: account }
      )
      const { balance } = result.events.Deposit.returnValues
      yield put({
        type: types.UPDATE_BALANCES,
        balances: {
          ...currentBalances,
          neb: {
            account:
              currentBalances[action.currency].account - parseFloat(value),
            exchange: formatBalance(balance)
          }
        }
      })
    }
    yield put({
      type: types.TRY_DEPOSITING_PASS,
      status: 'pass',
      message: `${action.currency.toUpperCase()} deposit successful`
    })
    return yield put({
      type: types.SET_WORKING_SPINNER,
      status: false,
      kind: 'isDepositing'
    })
  } catch (error) {
    yield put({
      type: types.TRY_DEPOSITING_FAIL,
      status: 'fail',
      message: error.message
    })
    return yield put({
      type: types.SET_WORKING_SPINNER,
      status: false,
      kind: 'isDepositing'
    })
  }
}

export function* tryMakingNewOrder(action) {
  try {
    yield put({
      type: types.SET_WORKING_SPINNER,
      status: true,
      kind: 'isMakingOrder'
    })
    const { orderForm } = action
    const orderQuantity = yield select(state =>
      selectOrderQuantity(state, orderForm)
    )
    const account = yield select(state => selectUserAccount(state))
    const connection = yield select(state => selectConnection(state))
    const exchangeContract = yield select(state =>
      selectContract(state, 'Exchange')
    )
    const tokenContract = yield select(state => selectContract(state, 'Token'))
    if (!connection) throw new Error('No connection found')
    if (!exchangeContract) throw new Error('No exchange contract found')
    if (!tokenContract) throw new Error('No token contract found')
    if (!account) throw new Error('No account found')
    let result
    let orderValue
    if (orderForm === 'buyOrder') {
      orderValue = yield select(state => selectBuyOrderValue(state))
      if (!orderValue) throw new Error('No order value found')
      result = yield call(
        runContractMethod,
        'send',
        exchangeContract,
        'makeOrder',
        [
          tokenContract.options.address,
          connection.utils.toWei(orderQuantity, 'ether'),
          ETHER_ADDRESS,
          connection.utils.toWei(orderValue.toString(), 'ether')
        ],
        { from: account }
      )
    } else {
      orderValue = yield select(state => selectSellOrderValue(state))
      if (!orderValue) throw new Error('No order value found')
      result = yield call(
        runContractMethod,
        'send',
        exchangeContract,
        'makeOrder',
        [
          ETHER_ADDRESS,
          connection.utils.toWei(orderValue.toString(), 'ether'),
          tokenContract.options.address,
          connection.utils.toWei(orderQuantity, 'ether')
        ],
        { from: account }
      )
    }
    const allOrders = yield select(state => selectAllOrders(state))
    const newOrder = result.events.Order.returnValues
    if (checkIsDuplicateOrder(newOrder, allOrders))
      throw new Error('Matching order ID already exists')
    yield put({
      type: types.ADD_ORDER,
      order: newOrder
    })
    yield put({
      type: types.TRY_MAKING_NEW_ORDER_PASS,
      status: 'pass',
      message: `New order made successfully`
    })
    return yield put({
      type: types.SET_WORKING_SPINNER,
      status: false,
      kind: 'isMakingOrder'
    })
  } catch (error) {
    yield put({
      type: types.TRY_MAKING_NEW_ORDER_FAIL,
      status: 'fail',
      message: error.message
    })
    return yield put({
      type: types.SET_WORKING_SPINNER,
      status: false,
      kind: 'isMakingOrder'
    })
  }
}
