import PropTypes from 'prop-types'
import React from 'react'

import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  backdrop: {
    height: '100vh',
    width: '100vw',
    zIndex: 1000
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    width: '100vw',
    zIndex: 1000
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
