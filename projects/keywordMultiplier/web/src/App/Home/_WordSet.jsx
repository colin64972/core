import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { WordSetLabel } from './WordSetLabel'
import { prepSetValue } from '../logic'
import { checkSetDisabled } from '../../store/selectors'

const useStyles = makeStyles(theme => {
  const textareaBase = {
    'width': '100%',
    'resize': 'none',
    'border': 'none',
    'backgroundColor': 'white',
    ...theme.typography.body1,
    'padding': theme.custom.setSpace(),
    'color': theme.palette.bodyColor,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.custom.setSpace()
    },
    'borderRadius': `0 0 ${theme.custom.borderRadius}px ${theme.custom.borderRadius}px`,
    '&:focus': {
      outline: 'none'
    },
    'transition': 'color 250ms ease-out'
  }
  return {
    enabled: {
      ...textareaBase
    },
    disabled: {
      ...textareaBase,
      color: theme.palette.grey[400]
    }
  }
})

export const WordSet = ({ ...props }) => {
  const classes = useStyles()
  const disabled = useSelector(state =>
    checkSetDisabled(state, props.input.name)
  )
  const blurHandler = event => {
    event.preventDefault()
    const { value } = event.currentTarget
    const preppedValue = prepSetValue(value)
    return props.input.onChange(preppedValue)
  }
  return (
    <Grid container direction="column" justify="center" align="center">
      <WordSetLabel
        id={props.id}
        label={props.label}
        name={props.input.name}
        dirty={props.meta.dirty}
        disabled={disabled}
      />
      <textarea
        onChange={props.input.onChange}
        onBlur={blurHandler}
        rows={props.rows}
        placeholder={props.placeholder}
        className={disabled ? classes.disabled : classes.enabled}
        id={props.id}
        name={props.input.name}
        disabled={disabled}
        value={props.input.value}
      />
    </Grid>
  )
}
