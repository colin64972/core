import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 1000,
    width: '100vw',
    height: '100vh'
  }
}))

export const BackDropScreen = ({ isOpen, spinner }) => {
  const classes = useStyles()
  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      {spinner && <CircularProgress color="primary" />}
    </Backdrop>
  )
}
