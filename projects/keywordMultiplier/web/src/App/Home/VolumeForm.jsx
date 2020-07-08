import classNames from 'classnames'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { Form, Field } from 'formik'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  Checkbox,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import { kEFields } from './fields'
import { VolumeFormTrialReview } from './VolumeFormTrialReview'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    margin: `${theme.custom.setSpace('sm')}px auto 0 auto`
  },
  formActionButtons: {
    ...theme.custom.setFlex('row nowrap', 'flex-start'),
    margin: `${theme.custom.setSpace('sm')}px 0 0 0`
  },
  formActionButton: {
    'margin': `0 ${theme.custom.setSpace()}px 0 0`,
    '&:last-of-type': {
      margin: 0
    }
  },
  formGroup: {
    width: '100%',
    margin: `${theme.custom.setSpace()}px 0`
  }
}))

export const VolumeForm = ({
  formikProps,
  closeDialogHandler,
  kEOptions,
  trialId
}) => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()

  return (
    <Form className={classes.form}>
      <VolumeFormTrialReview trialId={trialId} />

      {kEFields.map(kEField => (
        <Grid item xs={12} key={kEField.key}>
          <FadeIn direction="x" position={Math.random() > 0.5 ? 100 : -100}>
            <Field name={kEField.name}>
              {fieldProps => {
                // console.log(
                //   '%c fieldProps',
                //   'color: yellow; font-size: large',
                //   fieldProps
                // )
                return (
                  <FormControl
                    required
                    // error={false}
                    className={classes.formGroup}>
                    <InputLabel id={kEField.key}>{kEField.label}</InputLabel>
                    <Select
                      labelId={kEField.key}
                      id={kEField.key}
                      name={fieldProps.field.name}
                      value={fieldProps.field.value}
                      onChange={fieldProps.field.onChange}
                      onBlur={fieldProps.field.onBlur}>
                      {kEOptions[kEField.optionsName].map(option => (
                        <MenuItem key={option.key} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>asdf</FormHelperText>
                  </FormControl>
                )
              }}
            </Field>
          </FadeIn>
        </Grid>
      ))}

      <Field name="cardNumber">
        {fieldProps => {
          return (
            <FormControl error>
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
              // error={error}
              component="fieldset"
              // className={classes.formControl}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={}
                    // onChange={handleChange}
                    name="gilad"
                  />
                }
                label="Gilad Gray"
              />
              <FormHelperText>You can display an error</FormHelperText>
            </FormControl>
          )
        }}
      </Field>

      <FadeIn
        direction="y"
        position={100}
        className={classes.formActionButtons}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled
          className={classNames(classes.formActionButton)}>
          Pay and Process
        </Button>
        <Button
          type="reset"
          variant="contained"
          color="secondary"
          className={classNames(classes.formActionButton)}
          disabled={true}>
          Reset
        </Button>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={closeDialogHandler}
          className={classNames(classes.formActionButton)}>
          Close
        </Button>
      </FadeIn>
    </Form>
  )
}
