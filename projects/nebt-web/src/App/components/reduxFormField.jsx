import React, { useState } from 'react'
import { Field } from 'redux-form'
import NumberInput from './NumberInput'

export default ({ ...props }) => {
  const componentMap = {
    NumberInput,
  }
  const { componentType, ...rest } = props
  const [state, setState] = useState({
    component: componentMap[componentType],
  })
  return <Field component={state.component} {...rest} />
}
