import classNames from 'classnames'
import { Form, Field } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  formGroup: {
    width: '100%',
    margin: `${theme.custom.setSpace()}px 0`
  },
  centered: {
    ...theme.custom.setFlex()
  }
}))

export const RequestVolumeForm = ({
  formikProps,
  modalCloseHandler,
  kEOptions
}) => {
  const classes = useStyles()

  return (
    <Form
      // onSubmit={formikProps.handleSubmit}
      // onReset={formikProps.resetForm}
      className={classes.form}>
      <Field name="country">
        {fieldProps => (
          <FormControl required className={classes.formGroup}>
            <InputLabel id="country">Country</InputLabel>
            <Select
              labelId="country"
              id="country"
              name="country"
              value={formikProps.values.country}
              onChange={formikProps.handleChange}>
              {kEOptions.countryOptions.map(option => (
                <MenuItem key={option.key} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Field>
      <Field name="currency">
        {fieldProps => (
          <FormControl required className={classes.formGroup}>
            <InputLabel id="currency">CPC Currency</InputLabel>
            <Select
              labelId="currency"
              id="currency"
              name="currency"
              value={formikProps.values.currency}
              onChange={formikProps.handleChange}>
              {kEOptions.currencyOptions.map(option => (
                <MenuItem key={option.key} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Field>
      <Field name="dataSource">
        {fieldProps => (
          <FormControl required className={classes.formGroup}>
            <InputLabel id="dataSource">Data Source</InputLabel>
            <Select
              labelId="dataSource"
              id="dataSource"
              name="dataSource"
              value={formikProps.values.dataSource}
              onChange={formikProps.handleChange}>
              {kEOptions.dataSourceOptions.map(option => (
                <MenuItem key={option.key} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Field>
      <div className={classNames(classes.formGroup, classes.centered)}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button type="submit">Submit Order</Button>
          <Button type="reset">Reset</Button>
          <Button type="button" onClick={modalCloseHandler}>
            Close
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  )
}
