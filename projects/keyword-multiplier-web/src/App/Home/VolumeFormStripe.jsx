import clsx from 'clsx'
import { Field } from 'formik'
import React from 'react'

import { EMAIL_ADDRESS } from '@cjo3/shared/raw/constants/regex'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement
} from '@stripe/react-stripe-js'

const useStyles = makeStyles(theme => ({
  grid: {
    width: '100%',
    ...theme.custom.setGrid(12, 'auto', theme.custom.setSpace('sm')),
    [theme.breakpoints.down('xs')]: {
      ...theme.custom.setGrid(2, 'auto', theme.custom.setSpace())
    }
  },
  gridPosition1: {
    gridColumn: '1 / 13',
    gridRow: 1,
    marginTop: theme.custom.setSpace('sm'),
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13'
    }
  },
  gridPosition2: {
    gridColumn: '1 / 7',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13'
    }
  },
  gridPosition3: {
    gridColumn: '7 / 13',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 3
    }
  },
  gridPosition4: {
    gridColumn: '1 / 13',
    gridRow: 3,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 4
    }
  },
  inputLabel: {
    position: 'relative',
    top: -25,
    transition: 'font-size 250ms linear',
    fontSize: theme.typography.fontSize
  },
  inputLabelShrink: {
    fontSize: theme.typography.fontSize * 0.75
  },
  stripeBase: {
    'padding': '6px 0 7px 0',
    'transition': 'border 250ms linear',
    'borderBottom': '1px solid rgb(118, 118, 118)',
    '&:hover': {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    }
  },
  stripeComplete: {
    borderBottom: '1px solid rgb(118, 118, 118)'
  },
  stripeFocus: {
    borderBottom: `2px solid ${theme.palette.primary.main}`
  },
  stripeInvalid: {
    'borderBottom': `2px solid ${theme.palette.error.main}`,
    '&:hover': {
      borderBottom: `2px solid ${theme.palette.error.main}`
    }
  },
  fontSize: {
    fontSize: theme.typography.fontSize
  }
}))

export const VolumeFormStripe = () => {
  const classes = useStyles()

  const stripeElementValidator = value => {
    if (!value)
      return {
        status: true,
        message: 'Required'
      }
    if (value?.message)
      return {
        status: true,
        message: value.message
      }
  }

  const setStripeValue = (meta, name, setFieldValue) => {
    const { error, complete, empty } = meta
    let status = null
    if (!error && complete && !empty) {
      status = true
    } else {
      status = error
    }
    return setFieldValue(name, status, true)
  }

  const inputStyle = {
    base: {
      'color': 'rgb(68, 68, 68)',
      'fontFamily': 'Heebo, Roboto, Open Sans, Segoe UI, sans-serif',
      'fontSize': '1rem',
      'fontSmoothing': 'antialiased',
      '::placeholder': {
        color: 'rgb(68, 68, 68)',
        fontFamily: 'Heebo, Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '1rem'
      }
    },
    invalid: {
      color: '#f44336'
    }
  }

  const fieldIsDirty = meta => {
    const { error, value } = meta
    if (error || value) return true
    return false
  }

  const billingEmailValidator = value => {
    if (!value) return null
    if (!EMAIL_ADDRESS.test(value))
      return {
        status: true,
        message: 'Invalid email address'
      }
  }

  return (
    <div className={classes.grid}>
      <div className={classes.gridPosition1}>
        <Field name="cardNumber" validate={stripeElementValidator}>
          {fieldProps => (
            <FormControl
              fullWidth
              required
              error={fieldProps.meta.touched && fieldProps.meta.error?.status}
              className={classes.formControl}>
              <InputLabel
                htmlFor={`stripe-element-${fieldProps.field.name}`}
                className={clsx(classes.inputLabel, {
                  [classes.inputLabelShrink]: fieldIsDirty(fieldProps.meta)
                })}>
                Card Number
              </InputLabel>
              <CardNumberElement
                options={{
                  style: inputStyle,
                  classes: {
                    base: classes.stripeBase,
                    complete: classes.stripeComplete,
                    focus: classes.stripeFocus,
                    invalid: classes.stripeInvalid
                  }
                }}
                className={classes.stripeInput}
                id={`stripe-element-${fieldProps.field.name}`}
                name={fieldProps.field.name}
                value={fieldProps.field.value}
                onChange={meta =>
                  setStripeValue(
                    meta,
                    fieldProps.field.name,
                    fieldProps.form.setFieldValue
                  )
                }
                onBlur={meta => {
                  fieldProps.form.setFieldTouched(
                    fieldProps.field.name,
                    true,
                    true
                  )
                }}
              />
              {fieldProps.meta.touched && fieldProps.meta.error?.status && (
                <FormHelperText
                  id="component-error-text"
                  className={classes.formHelperText}>
                  {fieldProps.meta.error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        </Field>
      </div>

      <div className={classes.gridPosition2}>
        <Field name="cardExpiry" validate={stripeElementValidator}>
          {fieldProps => (
            <FormControl
              fullWidth
              required
              error={fieldProps.meta.touched && fieldProps.meta.error?.status}
              className={classes.formControl}>
              <InputLabel
                htmlFor={`stripe-element-${fieldProps.field.name}`}
                className={clsx(classes.inputLabel, {
                  [classes.inputLabelShrink]: fieldIsDirty(fieldProps.meta)
                })}>
                Card Expiry
              </InputLabel>
              <CardExpiryElement
                options={{
                  style: inputStyle,
                  classes: {
                    base: classes.stripeBase,
                    complete: classes.stripeComplete,
                    focus: classes.stripeFocus,
                    invalid: classes.stripeInvalid
                  }
                }}
                className={classes.stripeInput}
                id={`stripe-element-${fieldProps.field.name}`}
                name={fieldProps.field.name}
                value={fieldProps.field.value}
                onChange={meta =>
                  setStripeValue(
                    meta,
                    fieldProps.field.name,
                    fieldProps.form.setFieldValue
                  )
                }
                onBlur={meta => {
                  fieldProps.form.setFieldTouched(
                    fieldProps.field.name,
                    true,
                    true
                  )
                }}
              />
              {fieldProps.meta.touched && fieldProps.meta.error?.status && (
                <FormHelperText
                  id="component-error-text"
                  className={classes.formHelperText}>
                  {fieldProps.meta.error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        </Field>
      </div>

      <div className={classes.gridPosition3}>
        <Field name="cardCvc" validate={stripeElementValidator}>
          {fieldProps => (
            <FormControl
              fullWidth
              required
              error={fieldProps.meta.touched && fieldProps.meta.error?.status}
              className={classes.formControl}>
              <InputLabel
                htmlFor={`stripe-element-${fieldProps.field.name}`}
                className={clsx(classes.inputLabel, {
                  [classes.inputLabelShrink]: fieldIsDirty(fieldProps.meta)
                })}>
                Card Cvc
              </InputLabel>
              <CardCvcElement
                options={{
                  style: inputStyle,
                  classes: {
                    base: classes.stripeBase,
                    complete: classes.stripeComplete,
                    focus: classes.stripeFocus,
                    invalid: classes.stripeInvalid
                  }
                }}
                className={classes.stripeInput}
                id={`stripe-element-${fieldProps.field.name}`}
                name={fieldProps.field.name}
                value={fieldProps.field.value}
                onChange={meta =>
                  setStripeValue(
                    meta,
                    fieldProps.field.name,
                    fieldProps.form.setFieldValue
                  )
                }
                onBlur={meta => {
                  fieldProps.form.setFieldTouched(
                    fieldProps.field.name,
                    true,
                    true
                  )
                }}
              />
              {fieldProps.meta.touched && fieldProps.meta.error?.status && (
                <FormHelperText
                  id="component-error-text"
                  className={classes.formHelperText}>
                  {fieldProps.meta.error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        </Field>
      </div>

      <div className={classes.gridPosition4}>
        <Field name="billingEmail" validate={billingEmailValidator}>
          {fieldProps => (
            <TextField
              fullWidth
              name={fieldProps.field.name}
              error={fieldProps.meta.touched && fieldProps.meta.error?.status}
              id={fieldProps.field.name}
              label="Billing Email Address"
              onChange={fieldProps.field.onChange}
              onBlur={fieldProps.field.onBlur}
              value={fieldProps.field.value}
              InputProps={{
                classes: {
                  input: classes.fontSize
                }
              }}
              helperText={
                fieldProps.meta.touched && fieldProps.meta.error?.status
                  ? 'Invalid email address'
                  : 'Email address to send receipt. No receipt sent if left blank'
              }
            />
          )}
        </Field>
      </div>
    </div>
  )
}
