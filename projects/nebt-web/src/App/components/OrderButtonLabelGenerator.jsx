import React from 'react'
import { useSelector } from 'react-redux'
import { selectOrderPrice } from '../../store/selectors'

export default ({ ...props }) => {
  const { dirty, valid } = props
  const orderPrice = useSelector(state => selectOrderPrice(state))
  if (!dirty || !valid) {
    return 'Submit Order'
  }
  return `Submit Order at ${orderPrice} ETH`
}
