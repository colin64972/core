import { ETHER_ADDRESS, DECIMALS, PRECISION } from './constants'
import { groupBy, reject, maxBy, minBy } from 'lodash'
import moment from 'moment'
import { utils } from 'web3'

const setValue = (currency, sellType, sellAmount, buyAmount) => {
  if (currency === 'eth') {
    if (sellType === ETHER_ADDRESS) {
      return sellAmount / DECIMALS
    } else {
      return buyAmount / DECIMALS
    }
  } else {
    if (sellType === ETHER_ADDRESS) {
      return buyAmount / DECIMALS
    } else {
      return sellAmount / DECIMALS
    }
  }
}

export const calculatePrice = (eth, neb) =>
  Math.round((eth / neb) * PRECISION) / PRECISION

export const calculateOrderValue = (quantity, price) =>
  Math.round(quantity * price * PRECISION) / PRECISION

const decorateFilledOrder = (order, previous) => {
  let previousPrice = 0
  const ethValue = setValue(
    'eth',
    order.tokenGive,
    order.amountGive,
    order.amountGet
  )
  const nebValue = setValue(
    'neb',
    order.tokenGive,
    order.amountGive,
    order.amountGet
  )
  const price = calculatePrice(ethValue, nebValue)
  if (previous) {
    previousPrice = calculatePrice(
      setValue(
        'eth',
        previous.tokenGive,
        previous.amountGive,
        previous.amountGet
      ),
      setValue(
        'neb',
        previous.tokenGive,
        previous.amountGive,
        previous.amountGet
      )
    )
  }
  return {
    ...order,
    ethValue,
    nebValue,
    price,
    time: moment.unix(order.timestamp).format('kk:mm:ss'),
    date: moment.unix(order.timestamp).format('YYYY.MM.DD'),
    direction: price >= previousPrice ? 'up' : 'down'
  }
}

export const decorateFilledOrders = orders =>
  orders.map((order, index) => {
    const previous = orders[index + 1]
    return decorateFilledOrder(order, previous)
  })

export const findOpenOrders = (all, filled, cancelled) =>
  reject(all, order => {
    const orderFilled = filled.some(filledOrder => filledOrder.id === order.id)
    const orderCancelled = cancelled.some(
      cancelledOrder => cancelledOrder.id === order.id
    )
    return orderFilled || orderCancelled
  })

export const decorateOpenOrders = orders =>
  orders.map(order => {
    const ethValue = setValue(
      'eth',
      order.tokenGive,
      order.amountGive,
      order.amountGet
    )
    const nebValue = setValue(
      'neb',
      order.tokenGive,
      order.amountGive,
      order.amountGet
    )
    const price = calculatePrice(ethValue, nebValue)
    const orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell'
    return {
      ...order,
      nebValue,
      ethValue,
      price,
      orderType,
      orderClass: orderType,
      fillAction: orderType === 'buy' ? 'sell' : 'buy'
    }
  })

export const decorateMyHistory = orders =>
  orders.map(order => {
    const ethValue = setValue(
      'eth',
      order.tokenGive,
      order.amountGive,
      order.amountGet
    )
    const nebValue = setValue(
      'neb',
      order.tokenGive,
      order.amountGive,
      order.amountGet
    )
    const price = calculatePrice(ethValue, nebValue)
    const orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell'
    return {
      ...order,
      nebValue,
      ethValue,
      price,
      orderType,
      orderClass: orderType,
      direction: orderType === 'buy' ? 'up' : 'down',
      pastType: orderType === 'buy' ? 'bought' : 'sold',
      time: moment.unix(order.timestamp).format('kk:mm:ss'),
      date: moment.unix(order.timestamp).format('YYYY.MM.DD')
    }
  })

export const decorateMyOpenOrders = orders =>
  orders.map(order => {
    const ethValue = setValue(
      'eth',
      order.tokenGive,
      order.amountGive,
      order.amountGet
    )
    const nebValue = setValue(
      'neb',
      order.tokenGive,
      order.amountGive,
      order.amountGet
    )
    const price = calculatePrice(ethValue, nebValue)
    const orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell'
    return {
      ...order,
      nebValue,
      ethValue,
      price,
      orderType,
      orderClass: orderType
    }
  })

export const buildChartData = trades => {
  const grouped = groupBy(trades, trade =>
    moment.unix(trade.timestamp).startOf('hour').format()
  )
  const hours = Object.keys(grouped)
  return hours.map(hour => {
    const group = grouped[hour]
    const open = group[0]
    const high = maxBy(group, 'price')
    const low = minBy(group, 'price')
    const close = group[group.length - 1]
    return {
      x: new Date(hour),
      y: [
        parseFloat(open.price),
        parseFloat(high.price),
        parseFloat(low.price),
        parseFloat(close.price)
      ]
    }
  })
}

export const formatBalance = weiValue => {
  const temp = weiValue / DECIMALS
  return Math.round(temp * PRECISION) / PRECISION
}

export const convertToWei = value =>
  utils.BN(web3.utils.toWei(value.toString(), 'ether'))

export const checkIsDuplicateOrder = (newOrder, allOrders) => {
  const index = allOrders.findIndex(
    existingOrder => existingOrder.id === newOrder.id
  )
  return index >= 0
}
