import { Field } from 'formik'
import { useSelector } from 'react-redux'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Paper,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core'
import {
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'
import {
  CREDIT_CARD_NUMBER,
  CREDI_CARD_CODE,
  EMAIL_ADDRESS
} from '@colin30/shared/raw/constants/regex'
import { countryCodesList } from '@colin30/shared/raw/constants/countryCodes'
import {
  setExpMonthOptions,
  setExpYearOptions
} from '@colin30/shared/react/helpers'

const useStyles = makeStyles(theme => ({
  grid: {
    width: '100%',
    ...theme.custom.setGrid(12, 'auto', theme.custom.setSpace('sm')),
    [theme.breakpoints.down('xs')]: {
      ...theme.custom.setGrid(2, 'auto', theme.custom.setSpace())
    }
  },
  gridPositionCardNumber: {
    gridColumn: '1 / 13',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13'
    }
  },
  gridPositionExpMonth: {
    gridColumn: '1 / 5',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13'
    }
  },
  gridPositionExpYear: {
    gridColumn: '5 / 9',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 3
    }
  },
  gridPositionCode: {
    gridColumn: '9 / 13',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 4
    }
  },
  gridPositionBillingCountry: {
    gridColumn: '1 / 5',
    gridRow: 3,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 5
    }
  },
  gridPositionBillingEmail: {
    gridColumn: '5 / 13',
    gridRow: 3,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 6
    }
  },
  label: {
    position: 'relative',
    top: -22
  }
}))

export const VolumeFormStripe = () => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()

  const elements = useElements()

  const cardNumberValidator = value => {
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
  return (
    <div className={classes.grid}>
      <div className={classes.gridPositionCardNumber}>
        <Field name="cardNumber" validate={cardNumberValidator}>
          {fieldProps => {
            return (
              <FormControl
                fullWidth
                required
                error={fieldProps.meta.error?.status}>
                <InputLabel
                  htmlFor={fieldProps.field.name}
                  className={classes.label}>
                  Card Number
                </InputLabel>
                <CardNumberElement
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
                {fieldProps.meta.error?.status && (
                  <FormHelperText id="component-error-text">
                    {fieldProps.meta.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            )
          }}
        </Field>
      </div>
    </div>
  )
}
