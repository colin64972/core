import classNames from 'classnames'
import { Field } from 'formik'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from '@material-ui/core'
import {
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'
import { EMAIL_ADDRESS } from '@colin30/shared/raw/constants/regex'

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
    marginTop: theme.custom.setSpace(),
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
    transition: 'font-size 250ms linear'
  },
  inputLabelShrink: {
    fontSize: 18.2875 * 0.75
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
  }
}))

export const VolumeFormStripe = () => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()

  const elements = useElements()

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
      'fontSize': '18.2857px',
      'fontSmoothing': 'antialiased',
      '::placeholder': {
        color: 'rgb(68, 68, 68)',
        fontFamily: 'Heebo, Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '18.2857px'
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
          {fieldProps => {
            return (
              <FormControl
                fullWidth
                required
                error={fieldProps.meta.touched && fieldProps.meta.error?.status}
                className={classes.formControl}>
                <InputLabel
                  htmlFor={`stripe-element-${fieldProps.field.name}`}
                  className={classNames(classes.inputLabel, {
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
            )
          }}
        </Field>
      </div>

      <div className={classes.gridPosition2}>
        <Field name="cardExpiry" validate={stripeElementValidator}>
          {fieldProps => {
            return (
              <FormControl
                fullWidth
                required
                error={fieldProps.meta.touched && fieldProps.meta.error?.status}
                className={classes.formControl}>
                <InputLabel
                  htmlFor={`stripe-element-${fieldProps.field.name}`}
                  className={classNames(classes.inputLabel, {
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
            )
          }}
        </Field>
      </div>

      <div className={classes.gridPosition3}>
        <Field name="cardCvc" validate={stripeElementValidator}>
          {fieldProps => {
            return (
              <FormControl
                fullWidth
                required
                error={fieldProps.meta.touched && fieldProps.meta.error?.status}
                className={classes.formControl}>
                <InputLabel
                  htmlFor={`stripe-element-${fieldProps.field.name}`}
                  className={classNames(classes.inputLabel, {
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
            )
          }}
        </Field>
      </div>

      <div className={classes.gridPosition4}>
        <Field name="billingEmail" validate={billingEmailValidator}>
          {fieldProps => {
            return (
              <FormControl
                fullWidth
                error={
                  fieldProps.meta.touched && fieldProps.meta.error?.status
                }>
                <InputLabel htmlFor={fieldProps.field.name}>
                  Billing Email Address
                </InputLabel>
                <Input
                  id={fieldProps.field.name}
                  value={fieldProps.field.value}
                  onChange={fieldProps.field.onChange}
                  onBlur={fieldProps.field.onBlur}
                />
                <FormHelperText id="component-error-text">
                  {fieldProps.meta.touched && fieldProps.meta.error?.status
                    ? 'Invalid email address'
                    : 'Email address to send receipt. No receipt sent if left blank'}
                </FormHelperText>
              </FormControl>
            )
          }}
        </Field>
      </div>
    </div>
  )
}
