import React from 'react'
import { useSelector } from 'react-redux'
import { reduxForm } from 'redux-form'
import WorkingSpinner from '../components/workingSpinner'
import { selectSpinnerStatus } from '../../store/selectors'
import { validate } from './validator'
import { buyOrder } from './fields'
import OrderFormCreator from './OrderFormCreator'
import types from '../../store/types'

const form = ({ ...props }) => {
  const { name, fields, valid, dirty } = props
  const submitHandler = event => {
    event.preventDefault()
    props.dispatch({
      type: types.TRY_MAKING_NEW_ORDER,
      orderForm: name
    })
    return props.reset()
  }
  const { isMakingOrder } = useSelector(state => selectSpinnerStatus(state))
  if (isMakingOrder) return <WorkingSpinner />
  return (
    <OrderFormCreator
      name={name}
      fields={fields}
      submitHandler={submitHandler}
      valid={valid}
      dirty={dirty}
    />
  )
}

export default reduxForm({
  form: buyOrder.name,
  validate
})(form)
