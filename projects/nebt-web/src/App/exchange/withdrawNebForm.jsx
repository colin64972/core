import React from 'react'
import { reduxForm } from 'redux-form'
import { withdrawNeb } from './fields'
import TellerFormCreator from './tellerFormCreator'
import { validate } from './validator'
import types from '../../store/types'

const form = ({
  fields,
  name,
  currency,
  valid,
  dirty,
  dispatch,
  reset,
  ...props
}) => {
  const submitHandler = event => {
    event.preventDefault()
    dispatch({
      type: types.TRY_WITHDRAWING,
      currency: currency,
      formName: name
    })
    return reset()
  }
  return (
    <TellerFormCreator
      name={name}
      fields={fields}
      submitHandler={submitHandler}
      valid={valid}
      dirty={dirty}
    />
  )
}

export default reduxForm({
  form: withdrawNeb.name,
  validate
})(form)
