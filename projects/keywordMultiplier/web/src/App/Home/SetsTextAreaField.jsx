import React from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import Grid from '@material-ui/core/Grid'
import ListIcon from '@material-ui/icons/List'
import { makeStyles } from '@material-ui/styles'
import { prepSetValue } from '../logic'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => ({
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
    transition: 'all 250ms ease-out'
  },
  textAreaDisabled: {
    backgroundColor: theme.palette.grey[200]
  }
}))

export const SetsTextAreaField = props => {
  // console.log('%c FORMIK FIELD PROPS', 'color: yellow; font-size: large', props)

  const classes = useStyles()

  const dispatch = useDispatch()

  const toggleDisabledSet = (fieldName, fieldValue) => {
    if (props.disabled)
      return dispatch({
        type: types.REMOVE_DISABLED_SET,
        fieldName
      })
    if (!props.disabled && fieldValue)
      return dispatch({
        type: types.ADD_DISABLED_SET,
        fieldName
      })
    return null
  }

  return (
    <FadeIn
      direction={window.innerWidth < 600 ? 'x' : 'y'}
      position={Math.random() > 0.5 ? 100 : -100}>
      <Grid container>
        <label
          id={props.setField.label.id}
          htmlFor={props.setField.textArea.setName}
          className={classes.label}>
          <button
            type="button"
            onClick={event =>
              toggleDisabledSet(props.field.name, props.field.value)
            }
            className={classNames(classes.labelButton, {
              [classes.labelDisabled]: props.disabled,
              [classes.labelWithValue]: !props.disabled && props.field.value
            })}>
            <ListIcon className={classes.labelIcon} />
            {props.setField.label.name}
          </button>
        </label>
        <textarea
          className={classNames(classes.textArea, {
            [classes.textAreaDisabled]: props.disabled
          })}
          onChange={props.field.onChange}
          onBlur={event => {
            props.form.setFieldValue(
              props.field.name,
              prepSetValue(event.target.value),
              false
            )
            props.field.onBlur(event)
          }}
          rows={props.setField.textArea.rows}
          placeholder={props.setField.textArea.placeholder}
          id={props.setField.textArea.setName}
          name={props.setField.textArea.setName}
          disabled={props.disabled}
          value={props.field.value}
        />
      </Grid>
    </FadeIn>
  )
}
