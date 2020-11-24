import { Dialog, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useElements, useStripe } from '@stripe/react-stripe-js'

import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { VolumeForm } from './VolumeForm'
import { constants } from '@cjo3/shared/raw/constants/keyword-multiplier'
import { countryCodesList } from '@cjo3/shared/raw/constants/countryCodes'
import { makeStyles } from '@material-ui/core/styles'
import { setInitialCountry } from '@cjo3/shared/logic/keyword-multiplier'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => ({
  dialogContainer: {
    position: 'fixed',
    width: '100vw',
    minHeight: '100vh',
    top: 0,
    left: 0,
    zIndex: 100
  },
  paper: {
    backgroundColor: theme.palette.secondary[200],
    [theme.breakpoints.up('xs')]: {
      padding: theme.custom.setSpace('md')
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.custom.setSpace()
    }
  },
  contentContainer: {
    maxWidth: 1024
  },
  mainHeading: theme.typography.mainHeading,
  subHeading: theme.typography.subHeading
}))

export const Volume = ({ closeDialogHandler, dialogStatus, trialId }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const stripe = useStripe()
  const elements = useElements()

  const keOptions = {
    countryOptions: useSelector(state => state.kE.countries),
    currencyOptions: useSelector(state => state.kE.currencies),
    dataSourceOptions: useSelector(state => state.kE.dataSources),
    userSelections: useSelector(state => state.kE.userSelections)
  }

  let ipCountryCode = useSelector(state => state.app.geoIp?.country_code)
  const countryDetails = countryCodesList.find(
    country => country.alpha2Code === ipCountryCode
  )
  const firstCurrency = countryDetails?.currencies[0]
  const curCode = firstCurrency?.code.toLowerCase()

  let initalValues = {
    country: setInitialCountry(
      keOptions.userSelections?.country,
      ipCountryCode
    ),
    currency: keOptions.userSelections?.currency || curCode.toLowerCase(),
    dataSource: keOptions.userSelections?.dataSource || '',
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
    billingEmail: '',
    acceptTerms: false
  }

  if (process.env.USE_MOCKS) {
    initalValues = {
      country: keOptions.userSelections.country || 'ca',
      currency: keOptions.userSelections.currency || 'cad',
      dataSource: keOptions.userSelections.dataSource || 'gkp',
      cardNumber: true,
      cardExpiry: true,
      cardCvc: true,
      billingEmail: '',
      acceptTerms: true
    }
  }

  const customSubmitHandler = values => {
    const cardNumberElement = elements.getElement('cardNumber')
    if (!cardNumberElement) return null
    dispatch({
      type: types.ORDER_METRICS,
      values,
      cardNumberElement,
      confirmCardPaymentHandler: stripe.confirmCardPayment,
      closeDialogHandler
    })
  }

  const customResetHandler = (event, setFieldValueHandler) => {
    if (!elements) return null
    elements?._elements.forEach(element => element.clear())
    Object.entries(initalValues).forEach(([key, val]) =>
      setFieldValueHandler(key, val, false)
    )
  }

  const isSubmitting = useSelector(
    state => state.app?.spinnerStatuses[constants.VOLUME_SPINNER]
  )

  return (
    <Grid container className={classes.dialogContainer}>
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
        <BackDropScreen
          isOpen={isSubmitting}
          spinner
          className={classes.orderingBackdrop}
        />
        <Grid container className={classes.contentContainer}>
          <Grid item xs={12}>
            <Typography component="h4" className={classes.subHeading}>
              Keyword Metric Order Form
            </Typography>
            <Typography component="h3" className={classes.mainHeading}>
              Quantify your Keyword Variation Trial
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Formik initialValues={initalValues} onSubmit={customSubmitHandler}>
              {formikProps => (
                <VolumeForm
                  formikProps={formikProps}
                  closeDialogHandler={closeDialogHandler}
                  trialId={trialId}
                  keOptions={keOptions}
                  customResetHandler={customResetHandler}
                />
              )}
            </Formik>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  )
}

Volume.propTypes = {
  closeDialogHandler: PropTypes.func.isRequired,
  dialogStatus: PropTypes.bool.isRequired,
  trialId: PropTypes.string.isRequired
}
