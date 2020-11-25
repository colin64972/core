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
  if (!value.status && value.status === false) return value.message
}

const fieldIsDirty = meta => {
  const { error, value } = meta
  return value && error
}

const setStripeValue = (meta, name, setValue) => {
  const { error, complete, empty } = meta

  let value = {
    status: false,
    message: ''
  }

  if (complete && !error) {
    value.status = true
  } else if (empty) {
    value.message = 'Required'
  } else {
    value.message = error?.message.toString().replace('.', '')
  }

  setValue(name, value, true)
}

const useStyles = makeStyles(
  theme => ({
    StripeElement_inputLabel: {
      position: 'relative',
      top: -25,
      transition: 'font-size 250ms linear',
      fontSize: theme.typography.fontSize,
      marginBottom: theme.custom.setSpace() / 4
    },
    StripeElement_inputLabelShrink: {
      fontSize: theme.typography.fontSize * 0.75
    },
    StripeElement_stripeBase: {
      'padding': '6px 0 7px 0',
      'transition': 'border 250ms linear',
      'borderBottom': '1px solid rgb(118, 118, 118)',
      '&:hover': {
        borderBottom: `2px solid ${theme.palette.primary.main}`
      }
    },
    StripeElement_stripeComplete: {
      borderBottom: '1px solid rgb(118, 118, 118)'
    },
    StripeElement_stripeFocus: {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    },
    StripeElement_stripeInvalid: {
      'borderBottom': `2px solid ${theme.palette.error.main}`,
      '&:hover': {
        borderBottom: `2px solid ${theme.palette.error.main}`
      }
    },
    StripeElement_fontSize: {
      fontSize: `${theme.typography.fontSize}px`
    }
  }),
  {
    name: 'FormikCardElement'
  }
)

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
            className={clsx(classes.StripeElement_inputLabel, {
              [classes.StripeElement_inputLabelShrink]: fieldIsDirty(meta)
            })}>
            {label}
          </InputLabel>
          <Component
            id={`stripe-element-${field.name}`}
            options={{
              style: inputStyle,
              classes: {
                base: classes.StripeElement_stripeBase,
                complete: classes.StripeElement_stripeComplete,
                focus: classes.StripeElement_stripeFocus,
                invalid: classes.StripeElement_stripeInvalid
              }
            }}
            onChange={elementMeta =>
              setStripeValue(elementMeta, field.name, form.setFieldValue)
            }
            onBlur={(): void => {
              form.setFieldTouched(field.name, true, true)
            }}
          />
          {meta.touched && !field.value?.status && (
            <FormHelperText>{field.value?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  )
}
