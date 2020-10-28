import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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

export const BackDropScreen = ({ isOpen, spinner, backdrop = true }) => {
  const classes = useStyles()
  if (!backdrop)
    return (
      <div className={classes.container}>
        <CircularProgress className={classes.spinner} size="2rem" />
      </div>
    )
  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      {spinner && <CircularProgress color="primary" size="2rem" />}
    </Backdrop>
  )
}
