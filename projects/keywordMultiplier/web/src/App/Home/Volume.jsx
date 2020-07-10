import React from 'react'
import { Formik } from 'formik'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { Dialog, Typography } from '@material-ui/core'
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
    code: '',
    email: '',
    billingCountry: ''
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
      <FadeIn direction="x" position={-100}>
        <Typography variant="subtitle2" className={classes.subHeading}>
          Order Form
        </Typography>
      </FadeIn>
      <FadeIn direction="x" position={-100}>
        <Typography variant="h4" className={classes.mainHeading}>
          Keyword Volume Metrics
        </Typography>
      </FadeIn>
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
