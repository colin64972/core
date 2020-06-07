import React from 'react'
import { Formik } from 'formik'
import { useSelector } from 'react-redux'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import Grid from '@material-ui/core/Grid'
import RestorePageIcon from '@material-ui/icons/RestorePage'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import CachedIcon from '@material-ui/icons/Cached'
import { makeStyles } from '@material-ui/styles'
import { sets } from './fields'
import { WordSet } from './WordSet'
import { constants } from '../constants'
import { types } from '../../store/types'
import {
  checkResetDisabled,
  checkSubmitDisabled,
  getSpinnerStatus
} from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.custom.setSpace('sm'),
    ...theme.custom.setGrid(5, 'auto', theme.custom.setSpace('sm')),
    [theme.breakpoints.down('xs')]: {
      gridColumnGap: theme.custom.setSpace(),
      gridRowGap: theme.custom.setSpace(),
      marginTop: theme.custom.setSpace()
    }
  },
  set1: {
    gridColumn: '1 / 2',
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 6'
    }
  },
  set2: {
    gridColumn: '2 / 3',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 6',
      gridRow: 2
    }
  },
  set3: {
    gridColumn: '3 / 4',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 6',
      gridRow: 3
    }
  },
  set4: {
    gridColumn: '4 / 5',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 6',
      gridRow: 4
    }
  },
  set5: {
    gridColumn: '5 / 6',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 6',
      gridRow: 5
    }
  },
  submitGrid: {
    gridColumn: '1 / 4',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4',
      gridRow: 6
    }
  },
  resetGrid: {
    gridColumn: '4 / 6',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '4 / 6',
      gridRow: 6
    }
  },
  icon: {
    fontSize: theme.custom.setSpace() * 1.5,
    marginRight: theme.custom.setSpace() / 2,
    position: 'relative',
    top: -1
  },
  submitEnabled: {
    ...theme.custom.buttons.form(false, theme.palette.pass[500]),
    '&:hover': {
      backgroundColor: theme.palette.pass[400]
    }
  },
  submitDisabled: {
    ...theme.custom.buttons.form(true, theme.palette.grey[400])
  },
  resetEnabled: {
    ...theme.custom.buttons.form(false, theme.palette.fail[500]),
    '&:hover': {
      backgroundColor: theme.palette.fail[400]
    }
  },
  resetDisabled: {
    ...theme.custom.buttons.form(true, theme.palette.grey[400])
  }
}))

export const SetsForm = () => {
  const classes = useStyles()

  const submitDisabled = useSelector(state => checkSubmitDisabled(state))

  const resetDisabled = useSelector(state => checkResetDisabled(state))

  const spinnerStatus = useSelector(state =>
    getSpinnerStatus(state, constants.SETS_FORM_NAME)
  )

  const submitHandler = event => {
    event.preventDefault()
    // if (submitDisabled) return null
    // return props.dispatch({
    //   type: types.MULTIPLY_SETS
    // })
  }

  const resetHandler = event => {
    event.preventDefault()
    if (resetDisabled) return null
    // return props.dispatch({
    //   type: types.ASK_RESET_ALL,
    //   handler: props.reset
    // })
  }

  return (
    <Formik>
      {formik => {
        console.log(
          '%c Formik Props',
          'color: yellow; font-size: large',
          formik
        )
        return (
          <form
            onSubmit={submitHandler}
            onReset={resetHandler}
            className={classes.form}>
            {sets.map(field => (
              <div key={field.key} className={classes[field.class]}>
                <FadeIn
                  direction="y"
                  position={Math.random() > 0.5 ? 100 : -100}>
                  <Field component={WordSet} {...field} id={field.key} />
                </FadeIn>
              </div>
            ))}
            <div className={classes.submitGrid}>
              <FadeIn direction="x" position={-100}>
                <button
                  type={'submit'}
                  disabled={submitDisabled}
                  className={
                    submitDisabled
                      ? classes.submitDisabled
                      : classes.submitEnabled
                  }>
                  {spinnerStatus ? (
                    <Grid container justify="center">
                      <CachedIcon className={classes.icon} />
                      Working
                    </Grid>
                  ) : (
                    <Grid container justify="center">
                      <ShuffleIcon className={classes.icon} />
                      Multiply
                    </Grid>
                  )}
                </button>
              </FadeIn>
            </div>
            <div className={classes.resetGrid}>
              <FadeIn direction="x" position={100}>
                <button
                  type={'reset'}
                  disabled={resetDisabled}
                  className={
                    resetDisabled ? classes.resetDisabled : classes.resetEnabled
                  }>
                  <RestorePageIcon className={classes.icon} />
                  Reset All
                </button>
              </FadeIn>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
