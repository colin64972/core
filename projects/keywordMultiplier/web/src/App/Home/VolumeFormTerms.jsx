import Loadable from 'react-loadable'
import { Field } from 'formik'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const TermsAndConditionsLoadable = Loadable({
  loader: () => import('@colin30/shared/react/components/TermsAndConditions'),
  loading: props => {
    return <CircularProgress />
  },
  render: (loaded, props) => {
    let Component = loaded.TermsOfService
    return <Component {...props} />
  }
})

const useStyles = makeStyles(theme => ({
  formGroup: {
    width: '100%',
    margin: `${theme.custom.setSpace()}px 0`
  },
  checked: {
    '&$checked': {
      color: theme.palette.secondary[200]
    }
  },
  checkboxLabel: {
    ...theme.custom.setFlex(),
    fontSize: theme.custom.setSpace() * 1.25,
    lineHeight: 1.25
  },
  viewTermsButton: {
    ...theme.custom.iconButton,
    'color': theme.palette.secondary[50],
    'backgroundColor': theme.palette.secondary[200],
    'margin': `0 0 0 ${theme.custom.setSpace()}px`,
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.secondary[300]
    }
  },
  viewTermsButtonIcon: {
    fontSize: theme.custom.setSpace() * 1.5
  }
}))

export const VolumeFormTerms = () => {
  const classes = useStyles()

  const validator = value => {
    if (!value)
      return {
        status: true,
        message: 'Please accept the Terms of Service to continue'
      }
  }

  const [termsDialogStatus, setTermsDialogStatus] = useState(false)

  const openTermsDialogHandler = event => setTermsDialogStatus(true)
  const closeTermsDialogHandler = event => setTermsDialogStatus(false)

  return (
    <Field name="acceptTerms" validate={validator}>
      {fieldProps => (
        <FormControl
          required
          fullWidth
          error={fieldProps.meta.touched && fieldProps.meta.error?.status}>
          <FormControlLabel
            control={
              <Checkbox
                name={fieldProps.field.name}
                checked={fieldProps.field.value}
                onChange={fieldProps.field.onChange}
                onBlur={fieldProps.field.onBlur}
                color="secondary"
                classes={{
                  colorSecondary: classes.checked
                }}
              />
            }
            label={
              <div className={classes.checkboxLabel}>
                I accept the Terms &amp; Conditions
                <button
                  type="button"
                  onClick={openTermsDialogHandler}
                  className={classes.viewTermsButton}>
                  <SearchIcon className={classes.viewTermsButtonIcon} />
                </button>
                <TermsAndConditionsLoadable
                  open={termsDialogStatus}
                  closeHandler={closeTermsDialogHandler}
                  siteName={process.env.SITE_NAME}
                  siteUrl={process.env.SITE_URL}
                  siteContactEmail={process.env.SITE_CONTACT_EMAIL}
                />
              </div>
            }
          />
          {fieldProps.meta.touched && fieldProps.meta.error?.status && (
            <FormHelperText>{fieldProps.meta.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  )
}
