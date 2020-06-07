import classNames from 'classnames'
import { Formik, Field } from 'formik'
import React, { useState } from 'react'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import Grid from '@material-ui/core/Grid'
import ListIcon from '@material-ui/icons/List'
import RestorePageIcon from '@material-ui/icons/RestorePage'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import { makeStyles } from '@material-ui/styles'
import { setFields } from './fields'
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
    label: {
      width: '100%'
    },
    labelButton: {
      width: '100%',
      border: 'none',
      padding: theme.custom.setSpace(),
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: theme.typography.fontSize,
      borderRadius: `${theme.custom.borderRadius}px ${theme.custom.borderRadius}px 0 0`,
      backgroundColor: theme.palette.primary.main,
      transition: 'background-color 250ms ease-out',
      ...theme.custom.setFlex()
    },
    labelDisabled: {
      'backgroundColor': theme.palette.grey[400],
      'cursor': 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.grey[300]
      }
    },
    labelWithValue: {
      'backgroundColor': theme.palette.pass[500],
      'cursor': 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.pass[400]
      }
    },
    labelIcon: {
      fontSize: theme.custom.setSpace() * 1.5,
      position: 'relative',
      top: -1,
      marginRight: theme.custom.setSpace() / 2,
      [theme.breakpoints.up('lg')]: {
        top: 0
      }
    },
    textArea: {
      width: '100%',
      resize: 'none',
      border: 'none',
      backgroundColor: 'white',
      ...theme.typography.body1,
      padding: theme.custom.setSpace(),
      color: theme.palette.bodyColor,
      borderRadius: `0 0 ${theme.custom.borderRadius}px ${theme.custom.borderRadius}px`,
      transition: 'color 250ms ease-out'
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

export const SetsForm = () => {
  const classes = useStyles()

  const initialValues = {
    ...setFields.reduce((acc, cur) => {
      let temp = acc
      temp[cur.textArea.setName] = ''
      return temp
    }, {})
  }

  const [submitEnabled, setSubmitEnabled] = useState(false)
  const [resetEnabled, setResetEnabled] = useState(false)
  const [disabledSets, setDisabledSets] = useState([])

  // const checkActionsStatuses = sets => {
  //   const setsWithValues = Object.entries(sets).reduce((acc, cur) => {
  //     const update = acc
  //     const [key, val] = cur
  //     if (val !== '') {
  //       update.push(key)
  //     }
  //     return update
  //   }, [])

  //   const enabledSets = setsWithValues.reduce((acc, cur) => {
  //     const update = acc
  //     if (!disabledSets.includes(cur)) {
  //       update.push(cur)
  //     }
  //     return update
  //   }, [])

  //   setResetEnabled(setsWithValues.length > 0)
  //   setSubmitEnabled(enabledSets.length > 1)
  // }

  const labelClickHandler = (fieldName, fieldValue) => event =>
    setDisabledSets(fieldValue && !disabledSets.includes(fieldName))

  const customBlurHandler = (fieldName, fieldValue, handler) => {
    const newValue = prepSetValue(fieldValue)
    return handler(fieldName, newValue, false)
  }

  const customSubmitHandler = (values, actions) => event => {
    event.preventDefault()
    console.log(
      '%c SUBMITTING',
      'color: yellow; font-size: large',
      values,
      actions
    )
  }

  const customResetHandler = (values, actions) => event => {
    event.preventDefault()
    console.log(
      '%c RESETTING',
      'color: yellow; font-size: large',
      values,
      actions
    )
  }

  console.log('%c XXX', 'color: yellow; font-size: large', disabledSets)

  return (
    <Formik
      onSubmit={customSubmitHandler}
      onReset={customResetHandler}
      initialValues={initialValues}>
      {formProps => {
        // console.log(
        //   '%c Formik Props',
        //   'color: yellow; font-size: large',
        //   formProps
        // )
        return (
          <form
            onSubmit={formProps.handleSubmit}
            onReset={formProps.handleReset}
            className={classes.form}>
            {setFields.map(setField => (
              <Field
                key={setField.key}
                id={setField.textArea.setName}
                name={setField.textArea.setName}>
                {fieldProps => {
                  // console.log(
                  //   '%c fieldProps',
                  //   'color: lightgreen; font-size: large',
                  //   fieldProps
                  // )
                  return (
                    <FadeIn
                      direction="y"
                      position={Math.random() > 0.5 ? 100 : -100}
                      className={classes[setField.group.className]}>
                      <Grid container>
                        <label
                          htmlFor={setField.textArea.setName}
                          className={classes.label}>
                          <button
                            type="button"
                            onClick={labelClickHandler(
                              fieldProps.field.name,
                              fieldProps.meta.value
                            )}
                            className={classNames(classes.labelButton, {
                              [classes.labelDisabled]: disabledSets.includes(
                                setField.textArea.setName
                              ),
                              [classes.labelWithValue]:
                                fieldProps.meta.value &&
                                !disabledSets.includes(
                                  setField.textArea.setName
                                )
                            })}>
                            <ListIcon className={classes.labelIcon} />
                            {setField.label.name}
                          </button>
                        </label>
                        <textarea
                          className={classNames(classes.textArea)}
                          onChange={formProps.handleChange}
                          onBlur={event => {
                            formProps.handleBlur(event)
                            customBlurHandler(
                              fieldProps.field.name,
                              event.target.value,
                              formProps.setFieldValue
                            )
                          }}
                          rows={setField.textArea.rows}
                          placeholder={setField.textArea.placeholder}
                          id={setField.textArea.setName}
                          name={setField.textArea.setName}
                          disabled={disabledSets.includes(
                            setField.textArea.setName
                          )}
                          value={formProps.values[setField.textArea.setName]}
                        />
                      </Grid>
                    </FadeIn>
                  )
                }}
              </Field>
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
                disabled={!resetEnabled}
                onClick={formProps.resetForm}
                className={classNames(classes.resetButton, {
                  [classes.resetEnabled]: resetEnabled
                })}>
                <Grid container>
                  <RestorePageIcon className={classes.formButtonIcon} />
                  Reset All
                </Grid>
              </button>
            </FadeIn>
          </form>
        )
      }}
    </Formik>
  )
}
