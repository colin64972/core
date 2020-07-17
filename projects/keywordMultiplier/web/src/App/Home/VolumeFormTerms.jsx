import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { Field } from 'formik'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formGroup: {
    width: '100%',
    margin: `${theme.custom.setSpace()}px 0`
  },
  checked: {
    '&$checked': {
      color: theme.palette.secondary[200]
    }
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
                  label="I accept the Terms of Service"
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
