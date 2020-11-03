import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { prepSetValue } from '@cjo3/shared/logic/keyword-multiplier'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'
import { Grid, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ListIcon from '@material-ui/icons/List'

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
    fontSize: 14,
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
    fontSize: theme.typography.fontSize * 1.25,
    position: 'relative',
    top: 1,
    marginRight: theme.custom.setSpace() / 2
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

export const SetsTextAreaField = ({
  disabled,
  field: { onChange, onBlur, value, name },
  form: { setFieldValue },
  setField: { label, textArea }
}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const toggleDisabledSet = (fieldName, fieldValue) => {
    if (disabled)
      return dispatch({
        type: types.REMOVE_DISABLED_SET,
        fieldName
      })
    if (!disabled && fieldValue)
      return dispatch({
        type: types.ADD_DISABLED_SET,
        fieldName
      })
    return null
  }

  const setFadeInDirection = () => {
    if (!process.env.IS_SERVER) return window.innerWidth < 600 ? 'x' : 'y'
    return 'x'
  }

  return (
    <FadeIn
      direction={setFadeInDirection()}
      position={Math.random() > 0.5 ? 100 : -100}>
      <Grid container>
        <Tooltip
          title={
            !disabled && value
              ? 'Disable'
              : disabled
              ? 'Enable'
              : 'Enter Keywords'
          }
          placement="top-start"
          arrow>
          <label
            id={label.id}
            htmlFor={textArea.setName}
            className={classes.label}>
            <button
              type="button"
              onClick={() => toggleDisabledSet(name, value)}
              className={clsx(classes.labelButton, {
                [classes.labelDisabled]: disabled,
                [classes.labelWithValue]: !disabled && value
              })}>
              <ListIcon className={classes.labelIcon} />
              {label.name}
            </button>
          </label>
        </Tooltip>
        <textarea
          className={clsx(classes.textArea, {
            [classes.textAreaDisabled]: disabled
          })}
          onChange={onChange}
          onBlur={event => {
            setFieldValue(name, prepSetValue(event.target.value), false)
            onBlur(event)
          }}
          rows={textArea.rows}
          placeholder={textArea.placeholder}
          id={textArea.setName}
          name={textArea.setName}
          disabled={disabled}
          value={value}
        />
      </Grid>
    </FadeIn>
  )
}

SetsTextAreaField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  field: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }),
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired
  }),
  setField: PropTypes.shape({
    label: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.number.isRequired
    }),
    textArea: PropTypes.shape({
      setName: PropTypes.string.isRequired,
      rows: PropTypes.number.isRequired,
      placeholder: PropTypes.string.isRequired
    })
  })
}
