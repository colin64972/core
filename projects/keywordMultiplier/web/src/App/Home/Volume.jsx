import React from 'react'
import { Formik } from 'formik'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { Dialog, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { VolumeForm } from './VolumeForm'

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.secondary[100],
    [theme.breakpoints.up('xs')]: {
      padding: theme.custom.setSpace('lg')
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

  const initalValues = {
    country: '',
    currency: '',
    dataSource: '',
    acceptTerms: false,
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cardCode: '',
    billingEmail: '',
    billingCountry: ''
  }

  const customSubmitHandler = (values, actions) => {
    console.log(
      '%c submitHandler',
      'color: yellow; font-size: large',
      values,
      actions
    )
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
      <Grid
        container
        justify="flex-start"
        direction="column"
        alignItems="center">
        <Typography variant="subtitle2" className={classes.subHeading}>
          Order Form
        </Typography>
        <Typography variant="h4" className={classes.mainHeading}>
          Keyword Volume Metrics
        </Typography>
      </Grid>
      <Formik initialValues={initalValues} onSubmit={customSubmitHandler}>
        {formikProps => (
          <VolumeForm
            formikProps={formikProps}
            closeDialogHandler={closeDialogHandler}
            trialId={trialId}
          />
        )}
      </Formik>
    </Dialog>
  )
}

export default Volume
