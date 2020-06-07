import classNames from 'classnames'
import { Form, Field } from 'formik'
import React from 'react'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import Grid from '@material-ui/core/Grid'
import RestorePageIcon from '@material-ui/icons/RestorePage'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import { makeStyles } from '@material-ui/styles'
import { setFields } from './fields'
import { SetsTextAreaField } from './SetsTextAreaField'
import { prepSetValue } from '../logic'

const useStyles = makeStyles(theme => {
  const formButton = {
    padding: theme.custom.setSpace(),
    borderRadius: theme.custom.borderRadius,
    fontFamily: theme.typography.fontFamily,
    width: '100%',
    border: 'none',
    fontSize: theme.custom.setSpace(),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transition: 'all 250ms ease-out',
    color: theme.palette.bodyColor
  }
  return {
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
      ...formButton,
      backgroundColor: theme.palette.grey[400]
    },
    submitEnabled: {
      'backgroundColor': theme.palette.pass[500],
      '&:hover': {
        backgroundColor: theme.palette.pass[400]
      }
    },
    resetButton: {
      ...formButton,
      backgroundColor: theme.palette.grey[400]
    },
    resetEnabled: {
      'backgroundColor': theme.palette.fail[500],
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
  console.log('%c FORMIK PROPS', 'color: yellow; font-size: large', props)

  const classes = useStyles()

  return (
    <Form className={classes.form}>
      {setFields.map(setField => (
        <Field
          key={setField.key}
          name={setField.textArea.setName}
          component={SetsTextAreaField}
          setField={setField}
        />
      ))}
      <FadeIn
        direction="x"
        position={-100}
        className={classes.submitGridPosition}>
        <button
          type="submit"
          // disabled={!submitEnabled}
          // onClick={formProps.handleSubmit}
          className={classNames(classes.submitButton, {
            // [classes.submitEnabled]: submitEnabled
          })}>
          <Grid container>
            <ShuffleIcon className={classes.formButtonIcon} />
            Multiply
          </Grid>
        </button>
      </FadeIn>
      <FadeIn
        direction="x"
        position={100}
        className={classes.resetGridPosition}>
        <button
          type="reset"
          // disabled={!resetEnabled}
          // onClick={customResetHandler}
          className={classNames(classes.resetButton, {
            // [classes.resetEnabled]: resetEnabled
          })}>
          <Grid container>
            <RestorePageIcon className={classes.formButtonIcon} />
            Reset All
          </Grid>
        </button>
      </FadeIn>
    </Form>
  )
}
