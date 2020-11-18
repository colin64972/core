import { Field } from 'formik'
import React, { useState } from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  AcceptTerms_checked: {
    '&$checked': {
      color: theme.palette.secondary[200]
    }
  },
  AcceptTerms_checkboxPadding: {
    paddingLeft: 0
  },
  AcceptTerms_noMargin: {
    margin: 0
  }
}))

export const FormikAcceptTerms = () => {
  const classes = useStyles()

  const validator = value => {
    if (!value)
      return {
        status: true,
        message: 'Please accept the Terms & Conditions to continue'
      }
  }

  return (
    <Field name="acceptTerms" validate={validator}>
      {({ field, form, meta }) => (
        <FormControl
          required
          fullWidth
          error={meta.touched && meta.error?.status}>
          <FormControlLabel
            className={classes.AcceptTerms_noMargin}
            label="I accept the Terms &amp; Conditions"
            classes={{
              label: classes.AcceptTerms_noMargin
            }}
            control={
              <Checkbox
                name={field.name}
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                color="secondary"
                classes={{
                  root: classes.AcceptTerms_checkboxPadding,
                  colorSecondary: classes.AcceptTerms_checked
                }}
              />
            }
          />
          {meta.touched && meta.error?.status && (
            <FormHelperText>{meta.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  )
}
