import React, { useState } from 'react'
import { Formik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { VolumeForm } from './VolumeForm'
import { countryCodesList } from '@colin30/shared/raw/constants/countryCodes'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.secondary[100],
    [theme.breakpoints.up('xs')]: {
      padding: theme.custom.setSpace('md')
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.custom.setSpace()
    }
  },
  subHeading: {
    width: '100%',
    textAlign: 'left'
  },
  mainHeading: {
    ...theme.typography.mainHeading,
    width: '100%',
    textAlign: 'left'
  }
}))

const Volume = ({ dialogStatus, closeDialogHandler, trialId }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const keOptions = {
    countryOptions: useSelector(state => state.kE.countries),
    currencyOptions: useSelector(state => state.kE.currencies),
    dataSourceOptions: useSelector(state => state.kE.dataSources),
    userSelections: useSelector(state => state.kE.userSelections)
  }

  const ipCountryCode = useSelector(state => state.app.geoIp?.country_code)
  const countryDetails = countryCodesList.find(
    country => country.alpha2Code === ipCountryCode
  )
  const firstCurrency = countryDetails?.currencies[0]
  const curCode = firstCurrency?.code.toLowerCase()

  let initalValues = {
    country: keOptions.userSelections?.country || ipCountryCode,
    currency: keOptions.userSelections?.currency || curCode,
    dataSource: keOptions.userSelections?.dataSource || '',
    acceptTerms: false,
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cardCode: '',
    billingEmail: '',
    billingCountry: ipCountryCode
  }

  if (process.env.NODE_ENV === 'development') {
    initalValues = {
      country: keOptions.userSelections.country || 'ca',
      currency: keOptions.userSelections.currency || 'cad',
      dataSource: keOptions.userSelections.dataSource || 'gkp',
      acceptTerms: false,
      cardNumber: '4242424242424242',
      expMonth: '4',
      expYear: '2024',
      cardCode: '562',
      billingEmail: '',
      billingCountry: 'CA'
    }
  }

  const customSubmitHandler = (values, actions) => {
    dispatch({
      type: types.ORDER_METRICS,
      values
    })
  }

  return (
    <Dialog
      open={dialogStatus}
      transitionDuration={500}
      disableBackdropClick
      disableEscapeKeyDown
      fullScreen
      PaperProps={{
        classes: {
          root: classes.paper
        }
      }}>
      <Grid container justify="center" direction="column" alignItems="center">
        <Typography variant="subtitle2" className={classes.subHeading}>
          Order Form
        </Typography>
        <Typography variant="h4" className={classes.mainHeading}>
          Keyword Volume Metrics
        </Typography>
        <Formik initialValues={initalValues} onSubmit={customSubmitHandler}>
          {formikProps => (
            <VolumeForm
              formikProps={formikProps}
              closeDialogHandler={closeDialogHandler}
              trialId={trialId}
              keOptions={keOptions}
              curCode={curCode}
            />
          )}
        </Formik>
      </Grid>
    </Dialog>
  )
}

export default Volume
