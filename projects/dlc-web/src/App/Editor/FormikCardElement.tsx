import { FormControl, FormHelperText, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement
} from '@stripe/react-stripe-js'
import clsx from 'clsx'
import { Field } from 'formik'
import React from 'react'

const inputStyle = {
  base: {
    'color': 'rgb(68, 68, 68)',
    'fontFamily': 'Fira Sans, Roboto, Open Sans, Segoe UI, sans-serif',
    'fontSize': '14px',
    'fontSmoothing': 'antialiased',
    '::placeholder': {
      color: 'rgb(68, 68, 68)',
      fontFamily: 'Fira Sans, Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '14px'
    }
  },
  invalid: {
    color: '#f44336'
  }
}

const stripeElementValidator = value => {
  if (value.status && value.status === false) return value.errorMessage
}

const fieldIsDirty = meta => {
  const { error, value } = meta
  if (error || value) return true
  return false
}

const setStripeValue = (meta, name, setValue) => {
  const { error, complete, empty } = meta

  let value = {
    status: false,
    errorMessage: ''
  }

  if (complete && !error) {
    value.status = true
  } else if (empty) {
    value.errorMessage = 'Required'
  } else {
    value.errorMessage = error?.message
  }

  setValue(name, value, true)
}

const useStyles = makeStyles(theme => ({
  inputLabel: {
    position: 'relative',
    top: -25,
    transition: 'font-size 250ms linear',
    fontSize: theme.typography.fontSize,
    marginBottom: theme.custom.setSpace() / 4
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
    fontSize: `${theme.typography.fontSize}px`
  }
}))

const componentMap = {
  cardNumber: CardNumberElement,
  cardExpiry: CardExpiryElement,
  cardCvc: CardCvcElement
}

interface Props {
  name: string
  label: string
}

export const FormikCardElement: React.FC<Props> = ({
  name,
  label
}): JSX.Element => {
  const classes = useStyles()

  const Component: JSX.Element = componentMap[name]

  return (
    <Field name={name} validate={stripeElementValidator}>
      {({ field, form, meta }): JSX.Element => (
        <FormControl
          fullWidth
          required
          error={meta.touched && !field.value?.status}>
          <InputLabel
            htmlFor={`stripe-element-${field.name}`}
            className={clsx(classes.inputLabel, {
              [classes.inputLabelShrink]: fieldIsDirty(meta)
            })}>
            {label}
          </InputLabel>
          <Component
            id={`stripe-element-${field.name}`}
            options={{
              style: inputStyle,
              classes: {
                base: classes.stripeBase,
                complete: classes.stripeComplete,
                focus: classes.stripeFocus,
                invalid: classes.stripeInvalid
              }
            }}
            onChange={elementMeta =>
              setStripeValue(elementMeta, field.name, form.setFieldValue)
            }
            onBlur={(): void => {
              form.setFieldTouched(field.name, true, true)
            }}
          />
          {meta.touched && field.value && (
            <FormHelperText>{field.value?.errorMessage}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  )
}
