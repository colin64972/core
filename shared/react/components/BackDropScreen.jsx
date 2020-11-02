import { Backdrop, CircularProgress } from '@material-ui/core'

import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    zIndex: 1000,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    color: '#00bcd4'
  },
  backdrop: {
    zIndex: 1000,
    width: '100vw',
    height: '100vh'
  }
}))

export const BackDropScreen = ({ isOpen = false, spinner = true }) => {
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
