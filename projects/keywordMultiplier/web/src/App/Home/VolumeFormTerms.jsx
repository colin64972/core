import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { Field } from 'formik'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Paper
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formGroup: {
    width: '100%',
    margin: `${theme.custom.setSpace()}px 0`
  }
}))

export const VolumeFormTerms = ({ formSectionClass }) => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()

  return (
    <Paper className={formSectionClass}>
      <FadeIn direction="x" position={Math.random() > 0.5 ? 100 : -100}>
        <Field name="acceptTerms">
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
                // error={error}
                // component="fieldset"
                // className={classes.formControl}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={}
                      // onChange={handleChange}
                      name={fieldProps.field.name}
                    />
                  }
                  label="I accept the Terms of Service"
                />
                <FormHelperText>You can display an error</FormHelperText>
              </FormControl>
            )
          }}
        </Field>
      </FadeIn>
    </Paper>
  )
}
