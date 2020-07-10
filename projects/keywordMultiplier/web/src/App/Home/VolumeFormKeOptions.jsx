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
  formGroup: {
    width: '100%',
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

  return (
    <Paper className={formSectionClass}>
      {kEFields.map(kEField => (
        <FadeIn
          direction="x"
          position={Math.random() > 0.5 ? 100 : -100}
          key={kEField.key}>
          <Field name={kEField.name}>
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
                  // error={false}
                >
                  <InputLabel id={kEField.key}>{kEField.label}</InputLabel>
                  <Select
                    labelId={kEField.key}
                    id={kEField.key}
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
                  <FormHelperText>asdf</FormHelperText>
                </FormControl>
              )
            }}
          </Field>
        </FadeIn>
      ))}
    </Paper>
  )
}
