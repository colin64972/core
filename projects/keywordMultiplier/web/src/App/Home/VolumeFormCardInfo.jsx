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
  MenuItem
} from '@material-ui/core'
import {
  CREDIT_CARD_NUMBER,
  CREDI_CARD_CODE,
  EMAIL_ADDRESS
} from '@colin30/shared/raw/constants/regex'
import { countryCodesList } from '@colin30/shared/raw/constants/countryCodes'

const useStyles = makeStyles(theme => ({
  fieldGroup: {
    margin: theme.custom.setSpace()
  }
}))

export const VolumeFormCardInfo = ({ formSectionClass }) => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()

  const minYear = new Date().getFullYear()

  const ipCountryCode = useSelector(state => state.app.geoIp?.country_code)

  console.log(
    '%c ipCountryCode',
    'color: yellow; font-size: large',
    ipCountryCode
  )

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
    if (value < minYear)
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
      <FadeIn
        direction="x"
        position={Math.random() > 0.5 ? 100 : -100}
        className={classes.fieldGroup}>
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
      </FadeIn>
      <FadeIn
        direction="x"
        position={Math.random() > 0.5 ? 100 : -100}
        className={classes.fieldGroup}>
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
      </FadeIn>
      <FadeIn
        direction="x"
        position={Math.random() > 0.5 ? 100 : -100}
        className={classes.fieldGroup}>
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
      </FadeIn>
      <FadeIn
        direction="x"
        position={Math.random() > 0.5 ? 100 : -100}
        className={classes.fieldGroup}>
        <Field name="cardCode" validate={cardCodeValidator}>
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
      </FadeIn>
      <FadeIn
        direction="x"
        position={Math.random() > 0.5 ? 100 : -100}
        className={classes.fieldGroup}>
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
      </FadeIn>
      <FadeIn
        direction="x"
        position={Math.random() > 0.5 ? 100 : -100}
        className={classes.fieldGroup}>
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
      </FadeIn>
    </Paper>
  )
}
