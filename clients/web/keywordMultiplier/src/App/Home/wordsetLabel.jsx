import React from 'react'
import { useDispatch } from 'react-redux'
import ListIcon from '@material-ui/icons/List'
import { makeStyles } from '@material-ui/styles'
import types from '../../store/types'

const useStyles = makeStyles(theme => {
  const labelBase = {
    width: '100%',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    padding: theme.custom.setSpace(),
    fontSize: theme.typography.fontSize,
    borderRadius: `${theme.custom.borderRadius}px ${theme.custom.borderRadius}px 0 0`,
    backgroundColor: theme.palette.primary.main,
    transition: 'background-color 250ms ease-out',
    ...theme.custom.setFlex()
  }
  return {
    clean: {
      ...labelBase,
      backgroundColor: theme.palette.primary.main
    },
    disabled: {
      ...labelBase,
      'backgroundColor': theme.palette.grey[400],
      'cursor': 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.grey[300]
      }
    },
    dirty: {
      ...labelBase,
      'backgroundColor': theme.palette.pass[500],
      'cursor': 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.pass[400]
      }
    },
    icon: {
      fontSize: theme.custom.setSpace() * 1.5,
      position: 'relative',
      top: -1,
      marginRight: theme.custom.setSpace() / 2,
      [theme.breakpoints.down('xs')]: {
        top: 0
      }
    }
  }
})

const WordSetLabel = ({ ...props }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const clickHandler = event => {
    event.preventDefault()
    if (!props.dirty) return null
    return dispatch({
      type: types.TOGGLE_SET_STATUS,
      set: props.name
    })
  }
  return (
    <label
      htmlFor={props.id}
      className={
        props.disabled
          ? classes.disabled
          : props.dirty
          ? classes.dirty
          : classes.clean
      }
      onClick={clickHandler}>
      <ListIcon className={classes.icon} />
      {props.label}
    </label>
  )
}

export default WordSetLabel
