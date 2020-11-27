import PropTypes from 'prop-types'
import React from 'react'
import { createHashId } from '../helpers'

import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  () => ({
    noBackdrop: {
      width: '100%',
      height: '100%',
      position: 'relative',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100
    },
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
  }),
  {
    name: `BackDropScreen-${createHashId()}`
  }
)

export const BackDropScreen = ({ noBackDrop = false, isOpen, spinner }) => {
  const classes = useStyles()
  if (noBackDrop)
    return (
      <div className={classes.noBackdrop}>
        <CircularProgress color="primary" size="2rem" />
      </div>
    )
  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      {spinner && <CircularProgress color="primary" size="2rem" />}
    </Backdrop>
  )
}

BackDropScreen.propTypes = {
  isOpen: PropTypes.bool,
  spinner: PropTypes.bool
}
