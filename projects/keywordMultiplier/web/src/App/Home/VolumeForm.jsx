import classNames from 'classnames'
import { Form } from 'formik'
import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { VolumeFormCardInfo } from './VolumeFormCardInfo'
import { VolumeFormKEOptions } from './VolumeFormKEOptions'
import { VolumeFormPricing } from './VolumeFormPricing'
import { VolumeFormTrialReview } from './VolumeFormTrialReview'
import { VolumeFormTerms } from './VolumeFormTerms'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    margin: `${theme.custom.setSpace('sm')}px auto 0 auto`,
    [theme.breakpoints.down('xs')]: {
      marginTop: 0
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
  formActionButtons: {
    ...theme.custom.setFlex('row nowrap', 'flex-start')
  },
  formActionButton: {
    'margin': `0 ${theme.custom.setSpace()}px 0 0`,
    '&:last-of-type': {
      margin: 0
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
      />
      <VolumeFormKEOptions formSectionClass={classes.formSection} />
      <VolumeFormCardInfo formSectionClass={classes.formSection} />
      {/* <VolumeFormPricing
        formSectionClass={classes.formSection}
        trialId={trialId}
      /> */}
      <VolumeFormTerms formSectionClass={classes.formSection} />
      <FadeIn
        direction="y"
        position={100}
        className={classes.formActionButtons}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={
            !formikProps.isValid || checkIfPristine(formikProps.touched)
          }
          className={classNames(classes.formActionButton)}>
          Order
        </Button>
        <Button
          type="reset"
          variant="contained"
          color="secondary"
          className={classNames(classes.formActionButton)}
          disabled={checkIfPristine(formikProps.touched)}>
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
