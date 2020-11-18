import { TermsAndConditions } from '@cjo3/shared/react/components/TermsAndConditions'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { Field } from 'formik'
import React, { useState } from 'react'

const useStyles = makeStyles(theme => ({
  AcceptTerms_checkboxPadding: {
    paddingLeft: 0
  },
  AcceptTerms_noMargin: {
    margin: 0
  },
  AcceptTerms_labelContainer: {
    ...theme.custom.setFlex()
  },
  AcceptTerms_termsButton: {
    ...theme.custom.setFlex(),
    marginLeft: theme.custom.setSpace(),
    minWidth: 'unset',
    padding: theme.custom.setSpace() / 3
  },
  AcceptTerms_termsButtonIcon: {
    fontSize: theme.typography.fontSize * 1.5
  }
}))

export const FormikAcceptTerms = () => {
  const classes = useStyles()

  const [TAndCOpen, setTAndCOpen] = useState<boolean>(false)

  const openTAndCHandler = (): void => setTAndCOpen(true)

  const closeTAndCHandler = (): void => setTAndCOpen(false)

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
            label={
              <div className={classes.AcceptTerms_labelContainer}>
                I accept the Terms &amp; Conditions
                <Button
                  color="primary"
                  type="button"
                  onClick={openTAndCHandler}
                  variant="outlined"
                  className={classes.AcceptTerms_termsButton}>
                  <SearchIcon className={classes.AcceptTerms_termsButtonIcon} />
                </Button>
                <TermsAndConditions
                  open={TAndCOpen}
                  closeHandler={closeTAndCHandler}
                  siteName={process.env.SITE_NAME}
                  siteUrl={process.env.SITE_URL}
                  siteContactEmail={process.env.SITE_CONTACT_EMAIL}
                />
              </div>
            }
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
                  root: classes.AcceptTerms_checkboxPadding
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
