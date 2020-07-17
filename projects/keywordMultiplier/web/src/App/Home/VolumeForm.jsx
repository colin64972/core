import classNames from 'classnames'
import { Form } from 'formik'
import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { VolumeFormCardInfo } from './VolumeFormCardInfo'
import { VolumeFormKEOptions } from './VolumeFormKEOptions'
import { VolumeFormPricing } from './VolumeFormPricing'
import { VolumeFormTrialReview } from './VolumeFormTrialReview'
import { VolumeFormTerms } from './VolumeFormTerms'

const useStyles = makeStyles(theme => ({
  form: {
    width: theme.custom.setSpace() * 70,
    margin: `${theme.custom.setSpace('sm')}px auto 0 auto`,
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      width: '100%'
    }
  },
  formSection: {
    padding: theme.custom.setSpace('sm'),
    marginBottom: theme.custom.setSpace('sm'),
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      padding: theme.custom.setSpace(),
      marginBottom: theme.custom.setSpace()
    }
  },
  formSectionTitle: {
    color: theme.palette.primary[200],
    marginBottom: theme.custom.setSpace()
  },
  formActionButtons: {
    ...theme.custom.setFlex('row nowrap', 'flex-start')
  },
  formActionButton: {
    ...theme.custom.formButton,
    'margin': `0 ${theme.custom.setSpace()}px 0 0`,
    '&:last-of-type': {
      margin: 0
    }
  },
  formActionButtonSubmit: {
    'backgroundColor': theme.palette.pass[500],
    '&:hover': {
      backgroundColor: theme.palette.pass[400]
    }
  },
  formActionButtonReset: {
    'backgroundColor': theme.palette.fail[500],
    '&:hover': {
      backgroundColor: theme.palette.fail[400]
    }
  },
  formActionButtonClose: {
    'backgroundColor': theme.palette.primary[200],
    '&:hover': {
      backgroundColor: theme.palette.primary[300]
    }
  }
}))

export const VolumeForm = ({ formikProps, closeDialogHandler, trialId }) => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()

  const checkIfPristine = touchedFields => Object.keys(touchedFields).length < 1

  return (
    <Form className={classes.form}>
      <VolumeFormTrialReview
        trialId={trialId}
        formSectionClass={classes.formSection}
        formSectionTitleClass={classes.formSectionTitle}
      />
      <VolumeFormKEOptions
        formSectionClass={classes.formSection}
        formSectionTitleClass={classes.formSectionTitle}
      />
      <VolumeFormCardInfo
        formSectionClass={classes.formSection}
        formSectionTitleClass={classes.formSectionTitle}
      />
      <VolumeFormTerms
        formSectionClass={classes.formSection}
        formSectionTitleClass={classes.formSectionTitle}
      />
      <FadeIn
        direction="y"
        position={100}
        className={classes.formActionButtons}>
        <Button
          type="submit"
          variant="contained"
          disabled={
            !formikProps.isValid || checkIfPristine(formikProps.touched)
          }
          className={classNames(
            classes.formActionButton,
            classes.formActionButtonSubmit
          )}>
          Order
        </Button>
        <Button
          type="reset"
          variant="contained"
          className={classNames(
            classes.formActionButton,
            classes.formActionButtonReset
          )}
          disabled={checkIfPristine(formikProps.touched)}>
          Reset
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={closeDialogHandler}
          className={classNames(
            classes.formActionButton,
            classes.formActionButtonClose
          )}>
          Close
        </Button>
      </FadeIn>

      {/* <VolumeFormPricing
        formSectionClass={classes.formSection}
        trialId={trialId}
      /> */}
    </Form>
  )
}
