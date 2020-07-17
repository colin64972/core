import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { Field } from 'formik'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
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
    ...theme.custom.setFlex()
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

export const VolumeFormTerms = ({
  formSectionClass,
  formSectionTitleClass
}) => {
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
  return (
    <Paper className={formSectionClass}>
      <Typography variant="h3" className={formSectionTitleClass}>
        Other
      </Typography>
      <FadeIn direction="x" position={Math.random() > 0.5 ? 100 : -100}>
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
                error={
                  fieldProps.meta.touched && fieldProps.meta.error?.status
                }>
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
                      <Dialog
                        onClose={closeTermsDialogHandler}
                        open={termsDialogStatus}>
                        <DialogTitle disableTypography>
                          Terms of Service
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Eirmod takimata dolores at sed ea, gubergren sit
                            dolor ipsum et justo sea vero ut et. Labore eos
                            takimata ipsum ea ea, amet labore dolor erat ipsum
                            nonumy accusam, sed ea labore rebum nonumy sed et.
                            At sit labore elitr dolor est est vero, eirmod
                            aliquyam justo eirmod dolor tempor.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            autoFocus
                            onClick={closeTermsDialogHandler}
                            color="primary">
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  }
                />
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
    </Paper>
  )
}
