import PropTypes from 'prop-types'
import React from 'react'

import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    zIndex: 100
  },
  spinner: {
    color: '#00bcd4'
  }
}))

export const BackDropScreen = ({ isOpen, spinner }) => {
  const classes = useStyles()
  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      {spinner && <CircularProgress color="primary" size="2rem" />}
    </Backdrop>
  )
}

BackDropScreen.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  spinner: PropTypes.bool
}
