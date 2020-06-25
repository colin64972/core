import classNames from 'classnames'
import { Formik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { constants } from '../constants'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  formGroup: {
    width: '100%',
    margin: `${theme.custom.setSpace()}px 0`,
    ...theme.debug.border
  },
  centered: {
    ...theme.custom.setFlex()
  }
}))

export const RequestVolumeForm = props => {
  const classes = useStyles()

  const countryOptions = useSelector(state => state.kE.countries)
  const currencyOptions = useSelector(state => state.kE.currencies)
  const dataSourceOptions = useSelector(state => state.kE.dataSources)

  const initalValues = {
    country: countryOptions.find(
      option => option.value === constants.DEFAULT_VOLUME_REQUEST_COUNTRY
    ).value,
    currency: currencyOptions.find(
      option => option.value === constants.DEFAULT_VOLUME_REQUEST_CURRENCY
    ).value,
    dataSource: dataSourceOptions.find(
      option => option.value === constants.DEFAULT_VOLUME_REQUEST_DATASOURCE
    ).value
  }

  const onSubmit = (values, actions) => {
    console.log(
      '%c submitHandler',
      'color: yellow; font-size: large',
      JSON.stringify(values, null, 2),
      JSON.stringify(actions, null, 2)
    )
  }
  return (
    <Formik initialValues={initalValues} onSubmit={onSubmit}>
      {formik => {
        console.log(
          '%c Formik Props',
          'color: yellow; font-size: large',
          formik
        )
        return (
          <form
            onSubmit={formik.handleSubmit}
            onReset={formik.resetForm}
            className={classes.form}>
            <FormControl required className={classes.formGroup}>
              <InputLabel id="country">Country</InputLabel>
              <Select
                labelId="country"
                id="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}>
                {countryOptions.map(option => (
                  <MenuItem key={option.key} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required className={classes.formGroup}>
              <InputLabel id="currency">CPC Currency</InputLabel>
              <Select
                labelId="currency"
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}>
                {currencyOptions.map(option => (
                  <MenuItem key={option.key} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required className={classes.formGroup}>
              <InputLabel id="dataSource">Data Source</InputLabel>
              <Select
                labelId="dataSource"
                id="dataSource"
                name="dataSource"
                value={formik.values.dataSource}
                onChange={formik.handleChange}>
                {dataSourceOptions.map(option => (
                  <MenuItem key={option.key} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={classNames(classes.formGroup, classes.centered)}>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group">
                <Button type="submit">Submit Order</Button>
                <Button type="reset">Reset</Button>
                <Button type="button" onClick={props.modalCloseHandler}>
                  Close
                </Button>
              </ButtonGroup>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
