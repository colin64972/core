import { createSelector } from 'reselect'
import { get, groupBy } from 'lodash'
import {
  decorateFilledOrders,
  findOpenOrders,
  decorateOpenOrders,
  decorateMyHistory,
  decorateMyOpenOrders,
  buildChartData,
  calculateOrderValue
} from './helpers'
import { ETHER_ADDRESS } from '@cjo3/shared/raw/constants/web3'

const accountsSelector = state => get(state, 'web3.accounts', [])
const loadedContractsCountSelector = state =>
  get(state, 'web3.contracts.loadedCount', 0)
const recentTrades = state => get(state, 'web3.orders.filled', [])
const ordersSelector = state => get(state, 'web3.orders', {})
const spinnerStatusSelector = state => get(state, 'ui.spinners', {})
const balancesSelector = state => get(state, 'web3.balances', null)
const connectionSelector = state => get(state, 'web3.connection', null)
const buyOrderNebQuantitySelector = state =>
  get(state, 'form.buyOrder.values.nebQuantity', 0)
const buyOrderPriceSelector = state =>
  get(state, 'form.buyOrder.values.bidPrice', 0)
const sellOrderNebQuantitySelector = state =>
  get(state, 'form.sellOrder.values.nebQuantity', 0)
const sellOrderPriceSelector = state =>
  get(state, 'form.sellOrder.values.askPrice', 0)

export const selectUserAccount = createSelector(
  accountsSelector,
  accounts => accounts[0]
)
export const selectContractsLoadedStatus = createSelector(
  loadedContractsCountSelector,
  count => count === 2
)

export const selectContract = (state, contractName) =>
  get(state, `web3.contracts.${contractName}`, undefined)

export const selectRecentTrades = createSelector(recentTrades, orders => {
  if (orders.length < 1) return []
  const sorted = orders.sort((a, b) => b.timestamp - a.timestamp)
  return decorateFilledOrders(sorted)
})

export const selectChartTrades = createSelector(recentTrades, orders => {
  if (orders.length < 1) return []
  const sorted = orders.sort((a, b) => a.timestamp - b.timestamp)
  const decorated = decorateFilledOrders(sorted)
  return [
    {
      data: buildChartData(decorated)
    }
  ]
})

export const selectOpenOrders = createSelector(ordersSelector, orders => {
  const { all, filled, cancelled } = orders
  if (!all || !filled || !cancelled) return {}
  const openOrders = findOpenOrders(all, filled, cancelled)
  const decoratedOpen = decorateOpenOrders(openOrders)
  const grouped = groupBy(decoratedOpen, 'orderType')
  const buyOrders = get(grouped, 'buy', []).sort((a, b) => b.price - a.price)
  const sellOrders = get(grouped, 'sell', []).sort((a, b) => a.price - b.price)
  const sorted = {
    buyOrders,
    sellOrders
  }
  return sorted
})

export const selectMyHistory = createSelector(
  accountsSelector,
  recentTrades,
  (accounts, trades) => {
    const myTrades = trades.filter(
      trade => trade.user === accounts[0] || trade.userFill === accounts[0]
    )
    const sorted = myTrades.sort((a, b) => b.timestamp - a.timestamp)
    const decorated = decorateMyHistory(sorted)
    return decorated
  }
)

export const selectMyOpenOrders = createSelector(
  accountsSelector,
  ordersSelector,
  (account, allOrders) => {
    const { all, filled, cancelled } = allOrders
    if (!all || !filled || !cancelled) return []
    const openOrders = findOpenOrders(all, filled, cancelled)
    const myOpenOrders = openOrders.filter(order => order.user === account[0])
    const decoratedOrders = decorateMyOpenOrders(myOpenOrders)
    const sorted = decoratedOrders.sort((a, b) => b.price - a.price)
    return sorted
  }
)

export const selectCurrentPrice = createSelector(recentTrades, orders => {
  if (orders.length < 1) return []
  const sorted = orders.sort((a, b) => a.timestamp - b.timestamp)
  const decorated = decorateFilledOrders(sorted)
  const [secondLast, last] = decorated.slice(orders.length - 2, orders.length)
  const secondLastPrice = get(secondLast, 'price', 0)
  const lastPrice = get(last, 'price', 0)
  return {
    value: lastPrice,
    direction: lastPrice >= secondLastPrice ? 'up' : 'down'
  }
})

export const selectSpinnerStatus = createSelector(
  spinnerStatusSelector,
  statuses => statuses
)

export const selectBalances = createSelector(
  balancesSelector,
  balances => balances
)

export const selectConnection = createSelector(
  connectionSelector,
  connection => connection
)

export const selectCurrencyAccount = (state, currencyType) => {
  if (currencyType === 'ETH') return ETHER_ADDRESS
  return get(state, `web3.contracts.Token.options.address`, undefined)
}

export const selectWithdrawValue = (state, formName) =>
  get(state, `form[${formName}].values[${formName}]`, 0)

export const selectBuyOrderValue = createSelector(
  buyOrderNebQuantitySelector,
  buyOrderPriceSelector,
  (quantity, price) => calculateOrderValue(quantity, price)
)

export const selectSellOrderValue = createSelector(
  sellOrderNebQuantitySelector,
  sellOrderPriceSelector,
  (quantity, price) => calculateOrderValue(quantity, price)
)

export const selectOrderQuantity = (state, orderForm) =>
  get(state, `form.${orderForm}.values.nebQuantity`, 0)

export const selectOrderPrice = (state, orderForm) =>
  get(state, `form.${orderForm}.values.bidPrice`, 0)

export const selectOrders = createSelector(ordersSelector, orders => orders)

export const selectAllOrders = createSelector(ordersSelector, orders => {
  if (orders.all.length > 0) return orders.all
  return []
})
