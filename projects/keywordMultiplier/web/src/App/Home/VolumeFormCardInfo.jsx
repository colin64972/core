import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { Field } from 'formik'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Paper
} from '@material-ui/core'
import { CREDIT_CARD_NUMBER } from '@colin30/shared/raw/constants/regex'

const useStyles = makeStyles(theme => ({}))

export const VolumeFormCardInfo = ({ formSectionClass }) => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()

  const cardNumberValidator = value => {
    if (!CREDIT_CARD_NUMBER.test(value))
      return {
        status: true,
        message: 'Invalid card number'
      }
    return {
      status: false
    }
  }

  return (
    <Paper className={formSectionClass}>
      <FadeIn direction="x" position={Math.random() > 0.5 ? 100 : -100}>
        <Field name="cardNumber" validate={cardNumberValidator}>
          {fieldProps => {
            return (
              <FormControl
                fullWidth
                required
                error={fieldProps.meta.touched && fieldProps.meta.error.status}>
                <InputLabel htmlFor={fieldProps.field.name}>
                  Card Number
                </InputLabel>
                <Input
                  id={fieldProps.field.name}
                  value={fieldProps.field.value}
                  onChange={fieldProps.field.onChange}
                  onBlur={fieldProps.field.onBlur}
                />
                {fieldProps.meta.touched && fieldProps.meta.error.status && (
                  <FormHelperText id="component-error-text">
                    {fieldProps.meta.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            )
          }}
        </Field>
      </FadeIn>
    </Paper>
  )
}
