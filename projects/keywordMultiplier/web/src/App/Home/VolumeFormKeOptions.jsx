import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { Field } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Paper
} from '@material-ui/core'
import { kEFields } from './fields'

const useStyles = makeStyles(theme => ({
  fieldGroup: {
    margin: `${theme.custom.setSpace()}px 0`
  }
}))

export const VolumeFormKEOptions = ({ formSectionClass }) => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()

  const kEOptions = {
    countryOptions: useSelector(state => state.kE.countries),
    currencyOptions: useSelector(state => state.kE.currencies),
    dataSourceOptions: useSelector(state => state.kE.dataSources)
  }

  const validator = value => {
    if (!value)
      return {
        status: true,
        message: 'Required'
      }
  }

  return (
    <Paper className={formSectionClass}>
      {kEFields.map(kEField => (
        <FadeIn
          direction="x"
          position={Math.random() > 0.5 ? 100 : -100}
          key={kEField.key}
          className={classes.fieldGroup}>
          <Field name={kEField.name} validate={validator}>
            {fieldProps => {
              // console.log(
              //   '%c fieldProps',
              //   'color: yellow; font-size: large',
              //   fieldProps
              // )
              return (
                <FormControl
                  required
                  fullWidth
                  error={
                    fieldProps.meta.touched && fieldProps.meta.error?.status
                  }>
                  <InputLabel id={fieldProps.field.name}>
                    {kEField.label}
                  </InputLabel>
                  <Select
                    labelId={fieldProps.field.name}
                    id={fieldProps.field.name}
                    name={fieldProps.field.name}
                    value={fieldProps.field.value}
                    onChange={fieldProps.field.onChange}
                    onBlur={fieldProps.field.onBlur}>
                    {kEOptions[kEField.optionsName].map(option => (
                      <MenuItem key={option.key} value={option.value}>
                        {option.label}
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
      ))}
    </Paper>
  )
}
