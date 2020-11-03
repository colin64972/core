import { Field } from 'formik'
import React, { useState } from 'react'
import Loadable from 'react-loadable'

import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const TermsAndConditionsLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-TermsAndConditions" */
      /* webpackPrefetch: true */
      '@cjo3/shared/react/components/TermsAndConditions'
    ),
  loading: () => <BackDropScreen isOpen spinner />,
  render: (loaded, props) => {
    let Component = loaded.TermsAndConditions
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
    fontSize: theme.typography.fontSize,
    lineHeight: 1.25
  },
  viewTermsButton: {
    ...theme.custom.buttons.iconButton,
    'color': theme.palette.secondary[50],
    'backgroundColor': theme.palette.secondary[200],
    'margin': `0 0 0 ${theme.custom.setSpace()}px`,
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.secondary[300]
    }
  },
  viewTermsButtonIcon: {
    fontSize: theme.typography.fontSize * 1.25
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

  const openTermsDialogHandler = () => setTermsDialogStatus(true)
  const closeTermsDialogHandler = () => setTermsDialogStatus(false)

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
