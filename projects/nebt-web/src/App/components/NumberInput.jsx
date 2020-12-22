import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'

export default ({ ...props }) => {
  const { input, meta, fullWidth, validation, label, ...restProps } = props
  const hasError = err => {
    if (err) return true
    return false
  }
  return (
    <FormControl
      error={meta.touched && hasError(meta.error)}
      fullWidth={fullWidth}
      required={validation[0].required}>
      <InputLabel htmlFor={input.name}>{label}</InputLabel>
      <Input id={input.name} {...input} inputProps={restProps} />
      {meta.touched && hasError(meta.error) && (
        <FormHelperText>{meta.error.message}</FormHelperText>
      )}
    </FormControl>
  )
}
