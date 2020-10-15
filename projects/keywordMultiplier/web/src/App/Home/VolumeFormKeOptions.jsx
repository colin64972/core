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
  Paper,
  Select,
  Typography
} from '@material-ui/core'
import { kEFields } from './fields'

import { countryCodesList } from '@colin30/shared/raw/constants/countryCodes'

const useStyles = makeStyles(theme => ({
  grid: {
    width: '100%',
    ...theme.custom.setGrid(12, 'auto', theme.custom.setSpace('sm')),
    [theme.breakpoints.down('xs')]: {
      ...theme.custom.setGrid(2, 'auto', theme.custom.setSpace())
    }
  },
  gridPositionCountry: {
    gridColumn: '1 / 5',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13'
    }
  },
  gridPositionCurrency: {
    gridColumn: '5 / 9',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 2
    }
  },
  gridPositionDataSource: {
    gridColumn: '9 / 13',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 3
    }
  }
}))

export const VolumeFormKEOptions = ({ keOptions }) => {
  const classes = useStyles()

  const validator = value => {
    if (!value)
      return {
        status: true,
        message: 'Required'
      }
  }

  return (
    <div className={classes.grid}>
      {kEFields.map(kEField => (
        <div className={classes[kEField.className]} key={kEField.key}>
          <Field name={kEField.name} validate={validator}>
            {fieldProps => (
              <FormControl
                required
                fullWidth
                error={
                  fieldProps.meta.touched && fieldProps.meta.error?.status
                }>
                <InputLabel id={`${fieldProps.field.name}-label`}>
                  {kEField.label}
                </InputLabel>
                <Select
                  labelId={`${fieldProps.field.name}-label`}
                  id={`${fieldProps.field.name}-input`}
                  name={fieldProps.field.name}
                  value={fieldProps.field.value}
                  onChange={fieldProps.field.onChange}
                  onBlur={fieldProps.field.onBlur}>
                  {keOptions[kEField.optionsName].map(option => (
                    <MenuItem key={option.key} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {fieldProps.meta.touched && fieldProps.meta.error?.status
                    ? fieldProps.meta.error.message
                    : kEField?.helperText}
                </FormHelperText>
              </FormControl>
            )}
          </Field>
        </div>
      ))}
    </div>
  )
}
