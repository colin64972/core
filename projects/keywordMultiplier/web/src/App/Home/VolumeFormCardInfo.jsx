import classNames from 'classnames'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
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
  CREDIT_CARD_NUMBER,
  CREDI_CARD_CODE,
  EMAIL_ADDRESS
} from '@colin30/shared/raw/constants/regex'
import { countryCodesList } from '@colin30/shared/raw/constants/countryCodes'

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
  }
}))

export const VolumeFormCardInfo = ({
  formSectionClass,
  formSectionTitleClass
}) => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()

  const minYear = new Date().getFullYear()

  const ipCountryCode = useSelector(state => state.app.geoIp?.country_code)

  const cardNumberValidator = value => {
    if (!CREDIT_CARD_NUMBER.test(value))
      return {
        status: true,
        message: 'Invalid card number'
      }
  }

  const expMonthValidator = value => {
    if (!value)
      return {
        status: true,
        message: 'Required'
      }
    if (value < 1 || value > 12)
      return {
        status: true,
        message: 'Invalid month'
      }
  }

  const expYearValidator = value => {
    if (!value)
      return {
        status: true,
        message: 'Required'
      }
    if (value < minYear || value > minYear + 10)
      return {
        status: true,
        message: 'Invalid year'
      }
  }

  const cardCodeValidator = value => {
    if (!value)
      return {
        status: true,
        message: 'Required'
      }
    if (!CREDI_CARD_CODE.test(value))
      return {
        status: true,
        message: 'Invalid code'
      }
  }

  const billingEmailValidator = value => {
    if (!value) return null
    if (!EMAIL_ADDRESS.test(value))
      return {
        status: true,
        message: 'Invalid email address'
      }
  }

  const billingCountryValidator = value => {
    if (!value)
      return {
        status: true,
        message: 'Requried'
      }
  }

  return (
    <Paper className={formSectionClass}>
      <Typography variant="h3" className={formSectionTitleClass}>
        Credit Card Info
      </Typography>
      <div className={classes.grid}>
        <div className={classes.gridPositionCardNumber}>
          <Field name="cardNumber" validate={cardNumberValidator}>
            {fieldProps => {
              return (
                <FormControl
                  fullWidth
                  required
                  error={
                    fieldProps.meta.touched && fieldProps.meta.error?.status
                  }>
                  <InputLabel htmlFor={fieldProps.field.name}>
                    Card Number
                  </InputLabel>
                  <Input
                    id={fieldProps.field.name}
                    value={fieldProps.field.value}
                    onChange={fieldProps.field.onChange}
                    onBlur={fieldProps.field.onBlur}
                  />
                  {fieldProps.meta.touched && fieldProps.meta.error?.status && (
                    <FormHelperText id="component-error-text">
                      {fieldProps.meta.error.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )
            }}
          </Field>
        </div>
        <div className={classes.gridPositionExpMonth}>
          <Field name="expMonth" validate={expMonthValidator}>
            {fieldProps => {
              return (
                <FormControl
                  fullWidth
                  required
                  error={
                    fieldProps.meta.touched && fieldProps.meta.error?.status
                  }>
                  <InputLabel htmlFor={fieldProps.field.name}>
                    Expiry Month
                  </InputLabel>
                  <Input
                    type="number"
                    min={1}
                    max={12}
                    id={fieldProps.field.name}
                    value={fieldProps.field.value}
                    onChange={fieldProps.field.onChange}
                    onBlur={fieldProps.field.onBlur}
                  />
                  {fieldProps.meta.touched && fieldProps.meta.error?.status && (
                    <FormHelperText id="component-error-text">
                      {fieldProps.meta.error.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )
            }}
          </Field>
        </div>
        <div className={classes.gridPositionExpYear}>
          <Field name="expYear" validate={expYearValidator}>
            {fieldProps => {
              return (
                <FormControl
                  fullWidth
                  required
                  error={
                    fieldProps.meta.touched && fieldProps.meta.error?.status
                  }>
                  <InputLabel htmlFor={fieldProps.field.name}>
                    Expiry Year
                  </InputLabel>
                  <Input
                    type="number"
                    min={minYear}
                    id={fieldProps.field.name}
                    value={fieldProps.field.value}
                    onChange={fieldProps.field.onChange}
                    onBlur={fieldProps.field.onBlur}
                  />
                  {fieldProps.meta.touched && fieldProps.meta.error?.status && (
                    <FormHelperText id="component-error-text">
                      {fieldProps.meta.error.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )
            }}
          </Field>
        </div>
        <div className={classes.gridPositionCode}>
          <Field
            name="cardCode"
            validate={cardCodeValidator}
            className={classes.gridPositionCode}>
            {fieldProps => {
              return (
                <FormControl
                  fullWidth
                  required
                  error={
                    fieldProps.meta.touched && fieldProps.meta.error?.status
                  }>
                  <InputLabel htmlFor={fieldProps.field.name}>
                    Card Code
                  </InputLabel>
                  <Input
                    id={fieldProps.field.name}
                    value={fieldProps.field.value}
                    onChange={fieldProps.field.onChange}
                    onBlur={fieldProps.field.onBlur}
                  />
                  {fieldProps.meta.touched && fieldProps.meta.error?.status && (
                    <FormHelperText id="component-error-text">
                      {fieldProps.meta.error.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )
            }}
          </Field>
        </div>
        <div className={classes.gridPositionBillingCountry}>
          <Field name="billingCountry" validate={billingCountryValidator}>
            {fieldProps => {
              return (
                <FormControl
                  required
                  fullWidth
                  error={
                    fieldProps.meta.touched && fieldProps.meta.error?.status
                  }>
                  <InputLabel id={fieldProps.field.name}>
                    Billing Country
                  </InputLabel>
                  <Select
                    labelId={fieldProps.field.name}
                    id={fieldProps.field.name}
                    name={fieldProps.field.name}
                    value={ipCountryCode || fieldProps.field.value}
                    onChange={fieldProps.field.onChange}
                    onBlur={fieldProps.field.onBlur}>
                    {countryCodesList.map(option => (
                      <MenuItem
                        key={`${option.name}-${option.alpha2Code}`}
                        value={option.alpha2Code}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldProps.meta.touched && fieldProps.meta.error?.status && (
                    <FormHelperText>
                      {fieldProps.meta.error.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )
            }}
          </Field>
        </div>
        <div className={classes.gridPositionBillingEmail}>
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
    </Paper>
  )
}
