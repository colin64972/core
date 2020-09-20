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
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
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

  const TermsOfServiceLoadable = Loadable({
    loader: () => import('@colin30/shared/react/components/TermsOfService'),
    loading: props => {
      return <CircularProgress />
    },
    render: (loaded, props) => {
      let Component = loaded.TermsOfService
      return <Component {...props} />
    }
  })

  return (
    <Field name="acceptTerms" validate={validator}>
      {fieldProps => {
        // console.log(
        //   '%c fieldProps',
        //   'color: lightgreen; font-size: large',
        //   fieldProps
        // )
        return (
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
                  I accept the Terms of Service
                  <button
                    type="button"
                    onClick={openTermsDialogHandler}
                    className={classes.viewTermsButton}>
                    <SearchIcon className={classes.viewTermsButtonIcon} />
                  </button>
                  <TermsOfServiceLoadable
                    open={termsDialogStatus}
                    closeHandler={closeTermsDialogHandler}
                    siteName={process.env.SITE_NAME}
                    siteUrl={process.env.SITE_URL}
                    contactEmail={process.env.SITE_CONTACT}
                  />
                </div>
              }
            />
            {fieldProps.meta.touched && fieldProps.meta.error?.status && (
              <FormHelperText>{fieldProps.meta.error.message}</FormHelperText>
            )}
          </FormControl>
        )
      }}
    </Field>
  )
}
