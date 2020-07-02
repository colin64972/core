import React from 'react'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { defaultPadding } from '@colin30/shared/react/theming'
import { RequestVolumeForm } from './RequestVolumeForm'
import { constants } from '../constants'

const useStyles = makeStyles(theme => ({
  fullHeight: {
    height: '100vh'
  },
  paper: {
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace),
    [theme.breakpoints.down('md')]: {
      margin: `0 ${theme.custom.setSpace('md')}px`
    },
    [theme.breakpoints.down('sm')]: {
      margin: `0 ${theme.custom.setSpace('sm')}px`
    },
    [theme.breakpoints.down('xs')]: {
      margin: `0 ${theme.custom.setSpace('xs')}px`
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
  },
  body1: {
    width: '100%',
    textAlign: 'left',
    margin: `${theme.custom.setSpace()}px 0`
  }
}))

const RequestVolume = ({ status, modalCloseHandler, trial }) => {
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

  const customSubmitHandler = (values, actions) => {
    console.log(
      '%c submitHandler',
      'color: yellow; font-size: large',
      JSON.stringify(values, null, 2),
      JSON.stringify(actions, null, 2)
    )
  }

  return (
    <Modal
      open={status}
      onClose={modalCloseHandler}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}>
      <Fade in={status}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.fullHeight}>
          <Paper elevation={1} className={classes.paper}>
            <FadeIn direction="x" position={-100}>
              <Typography variant="subtitle2" className={classes.subHeading}>
                Order Form
              </Typography>
            </FadeIn>
            <FadeIn direction="x" position={-100}>
              <Typography variant="h4" className={classes.mainHeading}>
                Request Volume Metrics
              </Typography>
            </FadeIn>
            {/* <FadeIn direction="x" position={100}>
              <Typography variant="body1" className={classes.body1}>
                {JSON.stringify(trial, null, 2)}
              </Typography>
            </FadeIn> */}
            <Formik initialValues={initalValues} onSubmit={customSubmitHandler}>
              {formikProps => (
                <RequestVolumeForm
                  modalCloseHandler={modalCloseHandler}
                  kEOptions={{
                    countryOptions,
                    currencyOptions,
                    dataSourceOptions
                  }}
                  formikProps={formikProps}
                />
              )}
            </Formik>
          </Paper>
        </Grid>
      </Fade>
    </Modal>
  )
}

export default RequestVolume
