import React, { createRef } from 'react'
import { reduxForm, Field } from 'redux-form'
import { useSelector } from 'react-redux'
import { defaultPadding } from '@colin30/shared/react/theming'
import FadeIn from '@colin30/shared/react/components/FadeIn'
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import RestorePageIcon from '@material-ui/icons/RestorePage'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import CachedIcon from '@material-ui/icons/Cached'
import { makeStyles } from '@material-ui/styles'
import fields from './fields'
import WordSet from './WordSet'
import constants from '../constants'
import types from '../../store/types'
import {
  checkResetDisabled,
  checkSubmitDisabled,
  getSpinnerStatus
} from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  setsSection: {
    backgroundColor: theme.palette.grey[500],
    minHeight: '100vh',
    ...theme.custom.setFlex('column nowrap'),
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace),
    textAlign: 'center'
  },
  mainHeading: theme.typography.mainHeading,
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

const Comp = ({ ...props }) => {
  const classes = useStyles()
  const submitDisabled = useSelector(state => checkSubmitDisabled(state))
  const resetDisabled = useSelector(state => checkResetDisabled(state))
  const spinnerStatus = useSelector(state =>
    getSpinnerStatus(state, constants.SETS_FORM_NAME)
  )

  const submitHandler = event => {
    event.preventDefault()
    if (submitDisabled) return null
    return props.dispatch({
      type: types.MULTIPLY_SETS
    })
  }
  const resetHandler = event => {
    event.preventDefault()
    if (resetDisabled) return null
    return props.dispatch({
      type: types.ASK_RESET_ALL,
      handler: props.reset
    })
  }
  const setsRef = createRef()
  return (
    <Grid
      item
      xs={12}
      component="section"
      className={classes.setsSection}
      ref={setsRef}>
      <Grid container>
        <Hidden xsDown>
          <Grid item sm={2} md={3} />
        </Hidden>
        <Grid item xs={12} sm={8} md={6}>
          <FadeIn
            direction="y"
            position={-100}
            component={<Typography variant="subtitle2">Input Sets</Typography>}
          />
          <FadeIn
            direction="x"
            position={-100}
            component={
              <Typography variant="h4" className={classes.mainHeading}>
                Keyword Multiplication
                <br />
                to the Max!
              </Typography>
            }
          />
          <FadeIn
            direction="x"
            position={100}
            component={
              <Typography variant="body1">
                Est voluptua stet ea sadipscing nonumy gubergren eos, nonumy
                dolore dolore sadipscing est consetetur diam sed. Gubergren sea
                eirmod ut accusam dolore. Accusam sed sed amet aliquyam amet
                diam. Dolor ipsum nonumy gubergren gubergren. Takimata et lorem
                takimata sit sed dolor sit, rebum et gubergren accusam elitr
                dolores rebum stet.
              </Typography>
            }
          />
        </Grid>
        <Hidden xsDown>
          <Grid item sm={2} md={3} />
        </Hidden>
        <Grid item xs={12}>
          <form
            onSubmit={submitHandler}
            onReset={resetHandler}
            className={classes.form}>
            {fields.sets.map(field => (
              <div key={field.key} className={classes[field.class]}>
                <FadeIn
                  direction="y"
                  position={Math.random() > 0.5 ? 100 : -100}
                  component={
                    <Field component={WordSet} {...field} id={field.key} />
                  }
                />
              </div>
            ))}
            <div className={classes.submitGrid}>
              <FadeIn
                direction="x"
                position={-100}
                component={
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
                }
              />
            </div>
            <div className={classes.resetGrid}>
              <FadeIn
                direction="x"
                position={100}
                component={
                  <button
                    type={'reset'}
                    disabled={resetDisabled}
                    className={
                      resetDisabled
                        ? classes.resetDisabled
                        : classes.resetEnabled
                    }>
                    <RestorePageIcon className={classes.icon} />
                    Reset All
                  </button>
                }
              />
            </div>
          </form>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Sets = reduxForm({
  form: constants.SETS_FORM_NAME
})(Comp)

export default Sets
