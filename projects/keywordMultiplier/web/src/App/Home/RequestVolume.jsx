import React from 'react'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({}))

const RequestVolume = ({ status, closeHandler, trial }) => {
  const classes = useStyles()

  return (
    <Modal open={status} onClose={closeHandler}>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h2">Hello</Typography>
          <Typography variant="body1">
            {JSON.stringify(trial, null, 2)}
          </Typography>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default RequestVolume
