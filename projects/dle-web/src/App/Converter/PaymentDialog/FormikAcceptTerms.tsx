import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { useDispatch } from 'react-redux'
import { Field } from 'formik'
import { toggleTc } from '../../../store/app/actions'
import React from 'react'

const useStyles = makeStyles(
  theme => ({
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
  }),
  {
    name: 'AcceptTerms'
  }
)

export const FormikAcceptTerms = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const openTAndCHandler = (): void => {
    dispatch(toggleTc(true))
  }

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
