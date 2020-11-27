import PropTypes from 'prop-types'
import React from 'react'
import { Typography } from '@material-ui/core'
import { createHashId } from '../helpers'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  () => ({
    LoadFail_bg: {
      width: '100%',
      height: '100%',
      position: 'relative',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100
    }
  }),
  {
    name: `LoadFail-${createHashId()}`
  }
)

export const LoadFail = ({ message }) => {
  const classes = useStyles()
  return (
    <div className={classes.LoadFail_bg}>
      <Typography variant="h4" align="center" color="secondary">
        {message}
      </Typography>
    </div>
  )
}

LoadFail.propTypes = {
  message: PropTypes.string.isRequired
}
