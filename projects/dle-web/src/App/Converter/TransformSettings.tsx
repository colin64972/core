import { processSheet, setWaitTime } from '@cjo3/shared/logic/dle'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CachedIcon from '@material-ui/icons/Cached'
import clsx from 'clsx'
import { Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { scroller } from 'react-scroll'
import { transformOptions } from '../../constants'
import {
  discardTransformResult,
  saveTransformResult,
  setProcessing,
  setTransformSettings
} from '../../store/converter/actions'
import { TransformSettings as ITransformSettings } from '../../store/converter/interfaces'
import { initialState } from '../../store/converter/reducers'
import {
  currentSheetNameSelector,
  sheetDataSelector
} from '../../store/selectors'
import { FormikField } from './FormikField'
import { TransformSettingsSchema } from './validationSchemas'

const useStyles = makeStyles(
  theme => ({
    TransformSettings_contentContainer: {
      ...theme.custom.contentContainer,
      padding: theme.custom.setSpace('sm')
    },
    TransformSettings_formPanel: {
      ...theme.custom.borderRadius,
      padding: theme.custom.setSpace('sm'),
      backgroundColor: theme.palette.grey[100]
    },
    TransformSettings_formGrid: {
      ...theme.custom.setGrid(3, 1, theme.custom.setSpace('sm')),
      [theme.breakpoints.down('xs')]: {
        ...theme.custom.setGrid(3, 3, theme.custom.setSpace('sm'))
      }
    },
    TransformSettings_formGridPosition0: {
      gridColumn: '1 / 2',
      gridRow: 1,
      [theme.breakpoints.down('xs')]: {
        gridColumn: '1 / 4'
      }
    },
    TransformSettings_formGridPosition1: {
      gridColumn: '2 / 3',
      gridRow: 1,
      [theme.breakpoints.down('xs')]: {
        gridColumn: '1 / 4',
        gridRow: 2
      }
    },
    TransformSettings_formGridPosition2: {
      gridColumn: '3 / 4',
      gridRow: 1,
      [theme.breakpoints.down('xs')]: {
        gridColumn: '1 / 4',
        gridRow: 3
      }
    },
    TransformSettings_formGridPosition3: {
      ...theme.custom.setFlex(),
      gridColumn: '2 / 3',
      gridRow: 2,
      [theme.breakpoints.down('xs')]: {
        gridColumn: '1 / 4',
        gridRow: 4
      }
    },
    TransformSettings_formFieldTopMargin: {
      margin: `${theme.custom.setSpace('sm')}px 0 0 0`
    },
    TransformSettings_formButton: {
      'color': 'white',
      'marginRight': theme.custom.setSpace(),
      '&:last-of-type': {
        marginRight: 0
      }
    }
  }),
  {
    name: 'TransformSettings'
  }
)

export const TransformSettings: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    scroller.scrollTo('scroller-form', {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  })

  const sheetData = useSelector(sheetDataSelector)
  const currentSheetName = useSelector(currentSheetNameSelector)

  const submitHandler = (
    values: ITransformSettings,
    actions: FormikHelpers<ITransformSettings>
  ): void => {
    dispatch(setProcessing(true))

    const upperCaseRange: ITransformSettings = {
      ...values,
      rangeStart: values.rangeStart.toUpperCase(),
      rangeEnd: values.rangeEnd.toUpperCase()
    }

    dispatch(setTransformSettings(upperCaseRange))

    const result = processSheet(sheetData, upperCaseRange)

    const waitTime = Object.keys(result).length * 10

    setTimeout(() => {
      dispatch(saveTransformResult(result))

      actions.setSubmitting(false)

      dispatch(setProcessing(false))
    }, setWaitTime(waitTime))
  }

  const [sheetKey, setSheetKey] = useState<string>('')

  useEffect(() => {
    if (sheetData) setSheetKey(currentSheetName)
  }, [sheetData])

  const resetHandler = (values, actions): void => {
    dispatch(discardTransformResult())
  }

  if (!sheetData) return null

  return (
    <Grid
      container
      justify="center"
      className={classes.TransformSettings_contentContainer}>
      <Formik
        key={sheetKey}
        initialValues={initialState.transformSettings}
        onSubmit={submitHandler}
        onReset={resetHandler}
        validationSchema={TransformSettingsSchema}>
        {({ dirty, isValid, isSubmitting }) => {
          return (
            <Form
              className={classes.TransformSettings_formGrid}
              name="scroller-form">
              <Paper
                className={clsx(
                  classes.TransformSettings_formGridPosition0,
                  classes.TransformSettings_formPanel
                )}
                elevation={0}>
                <Typography variant="h5" align="center">
                  Scope Range
                </Typography>
                <FormikField
                  name="rangeStart"
                  label="Range Start"
                  id="rangeStart-input"
                  placeholder="a8"
                  helperMessage="Max columns ZZ"
                  style={classes.TransformSettings_formFieldTopMargin}
                />
                <FormikField
                  name="rangeEnd"
                  label="Range End"
                  id="rangeEnd-input"
                  placeholder="w49"
                  helperMessage="Max columns ZZ"
                  style={classes.TransformSettings_formFieldTopMargin}
                />
              </Paper>
              <Paper
                className={clsx(
                  classes.TransformSettings_formGridPosition1,
                  classes.TransformSettings_formPanel
                )}
                elevation={0}>
                <Typography variant="h5" align="center">
                  Under Limit
                </Typography>
                <FormikField
                  required
                  name="ulTrigger"
                  label="Trigger Character"
                  id="ulTrigger-input"
                  placeholder="<, -, or custom"
                  style={classes.TransformSettings_formFieldTopMargin}
                />
                <FormikField
                  required
                  kind="select"
                  name="ulTransform"
                  label="Transform Function"
                  id="ulTransform-input"
                  placeholder="<, -, or custom"
                  options={transformOptions}
                  style={classes.TransformSettings_formFieldTopMargin}
                />
                <FormikField
                  name="ulTriggerZero"
                  label="Zero Trigger"
                  id="ulTriggerZero-input"
                  placeholder="null, void, N/A, etc."
                  style={classes.TransformSettings_formFieldTopMargin}
                />
              </Paper>
              <Paper
                className={clsx(
                  classes.TransformSettings_formGridPosition2,
                  classes.TransformSettings_formPanel
                )}
                elevation={0}>
                <Typography variant="h5" align="center">
                  Over Limit
                </Typography>
                <FormikField
                  required
                  name="olTrigger"
                  label="Trigger Character"
                  id="olTrigger-input"
                  placeholder=">, +, or custom"
                  style={classes.TransformSettings_formFieldTopMargin}
                />
                <FormikField
                  required
                  kind="select"
                  name="olTransform"
                  label="Transform Function"
                  id="olTransform-input"
                  placeholder=">, +, or custom"
                  options={transformOptions}
                  style={classes.TransformSettings_formFieldTopMargin}
                />
              </Paper>
              <Grid
                container
                className={classes.TransformSettings_formGridPosition3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !isValid || !dirty}
                  className={classes.TransformSettings_formButton}>
                  {isSubmitting ? <CachedIcon size="1rem" /> : 'Process'}
                </Button>
                <Button
                  type="reset"
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting || !dirty}
                  className={classes.TransformSettings_formButton}>
                  Reset
                </Button>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </Grid>
  )
}
