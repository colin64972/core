import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { Field } from 'formik'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Paper
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({}))

export const VolumeFormCardInfo = ({ formSectionClass }) => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()

  return (
    <Paper className={formSectionClass}>
      <FadeIn direction="x" position={Math.random() > 0.5 ? 100 : -100}>
        <Field name="cardNumber">
          {fieldProps => {
            return (
              <FormControl error fullWidth>
                <InputLabel htmlFor="component-error">Name</InputLabel>
                <Input
                  id="component-error"
                  value={name}
                  // onChange={handleChange}
                  aria-describedby="component-error-text"
                />
                <FormHelperText id="component-error-text">Error</FormHelperText>
              </FormControl>
            )
          }}
        </Field>
      </FadeIn>
    </Paper>
  )
}
