import classNames from 'classnames'
import { Form, Field } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'
import { Grid } from '@material-ui/core'
import RestorePageIcon from '@material-ui/icons/RestorePage'
import CachedIcon from '@material-ui/icons/Cached'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import { makeStyles } from '@material-ui/styles'
import { setFields } from './fields'
import { SetsTextAreaField } from './SetsTextAreaField'
import { constants } from '@cjo3/shared/raw/constants/km'
import { getSetsWithValues } from '@cjo3/shared/logic/km'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => {
  return {
    backdrop: {
      zIndex: theme.zIndex.drawer + 1
    },
    form: {
      marginTop: theme.custom.setSpace('sm'),
      ...theme.custom.setGrid(5, 'auto', theme.custom.setSpace('sm')),
      [theme.breakpoints.down('xs')]: {
        gridColumnGap: theme.custom.setSpace(),
        gridRowGap: theme.custom.setSpace(),
        marginTop: theme.custom.setSpace()
      }
    },
    setField1GridPosition: {
      gridColumn: '1 / 2',
      [theme.breakpoints.down('xs')]: {
        gridColumn: '1 / 6'
      }
    },
    setField2GridPosition: {
      gridColumn: '2 / 3',
      gridRow: 1,
      [theme.breakpoints.down('xs')]: {
        gridColumn: '1 / 6',
        gridRow: 2
      }
    },
    setField3GridPosition: {
      gridColumn: '3 / 4',
      gridRow: 1,
      [theme.breakpoints.down('xs')]: {
        gridColumn: '1 / 6',
        gridRow: 3
      }
    },
    setField4GridPosition: {
      gridColumn: '4 / 5',
      gridRow: 1,
      [theme.breakpoints.down('xs')]: {
        gridColumn: '1 / 6',
        gridRow: 4
      }
    },
    setField5GridPosition: {
      gridColumn: '5 / 6',
      gridRow: 1,
      [theme.breakpoints.down('xs')]: {
        gridColumn: '1 / 6',
        gridRow: 5
      }
    },
    submitGridPosition: {
      gridColumn: '1 / 4',
      gridRow: 2,
      [theme.breakpoints.down('xs')]: {
        gridColumn: '1 / 6',
        gridRow: 6
      }
    },
    resetGridPosition: {
      gridColumn: '4 / 6',
      gridRow: 2,
      [theme.breakpoints.down('xs')]: {
        gridColumn: '1 / 6',
        gridRow: 7
      }
    },
    submitButton: {
      ...theme.custom.formButton,
      backgroundColor: theme.palette.grey[400]
    },
    submitEnabled: {
      'cursor': 'pointer',
      'backgroundColor': theme.palette.pass[500],
      '&:hover': {
        backgroundColor: theme.palette.pass[400]
      }
    },
    resetButton: {
      ...theme.custom.formButton,
      backgroundColor: theme.palette.grey[400]
    },
    resetEnabled: {
      'backgroundColor': theme.palette.fail[500],
      'cursor': 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.fail[400]
      }
    },
    formButtonIcon: {
      fontSize: theme.custom.setSpace() * 1.5,
      marginRight: theme.custom.setSpace() / 2,
      position: 'relative',
      top: -1
    }
  }
})

export const SetsForm = props => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const disabledSets = useSelector(state => state.app?.disabledSets)

  const isSubmitting = useSelector(
    state => state.app?.spinnerStatuses[constants.SETS_FORM_NAME]
  )

  const setsWithValues = getSetsWithValues(props.values)

  const submitEnabled = setsWithValues.length - disabledSets.length > 1

  const resetEnabled = setsWithValues.length > 0

  const customResetHandler = event => {
    event.preventDefault()
    return dispatch({
      type: types.ASK_RESET_ALL,
      handler: props.handleReset
    })
  }

  return (
    <Form className={classes.form}>
      <BackDropScreen isOpen={isSubmitting} spinner />
      {setFields.map(setField => (
        <div key={setField.key} className={classes[setField.group.className]}>
          <Field
            name={setField.textArea.setName}
            component={SetsTextAreaField}
            setField={setField}
            disabled={disabledSets.includes(setField.textArea.setName)}
          />
        </div>
      ))}
      <FadeIn
        direction="x"
        position={-100}
        className={classes.submitGridPosition}>
        <button
          type="submit"
          disabled={!submitEnabled}
          className={classNames(classes.submitButton, {
            [classes.submitEnabled]: submitEnabled
          })}>
          {isSubmitting ? (
            <Grid container>
              <CachedIcon className={classes.formButtonIcon} />
              Submitting
            </Grid>
          ) : (
            <Grid container>
              <ShuffleIcon className={classes.formButtonIcon} />
              Generate Trial
            </Grid>
          )}
        </button>
      </FadeIn>
      <FadeIn
        direction="x"
        position={100}
        className={classes.resetGridPosition}>
        <button
          type="button"
          onClick={customResetHandler}
          disabled={!resetEnabled}
          className={classNames(classes.resetButton, {
            [classes.resetEnabled]: resetEnabled
          })}>
          <Grid container>
            <RestorePageIcon className={classes.formButtonIcon} />
            Reset Everything
          </Grid>
        </button>
      </FadeIn>
    </Form>
  )
}
