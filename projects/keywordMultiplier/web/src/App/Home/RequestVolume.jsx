import React, { useEffect } from 'react'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { defaultPadding } from '@colin30/shared/react/theming'

const useStyles = makeStyles(theme => ({
  fullHeight: {
    height: '100vh'
  },
  paper: {
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace),
    [theme.breakpoints.down('sm')]: {
      margin: `0 ${theme.custom.setSpace()}px`
    }
  }
}))

const RequestVolume = ({ status, closeHandler, trial }) => {
  const classes = useStyles()
  useEffect(() => {
    console.log(
      '%c RequestVolume',
      'color: yellow; font-size: large',
      status,
      trial
    )
  }, [])
  return (
    <Modal open={status} onClose={closeHandler}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.fullHeight}>
            <Grid item xs={12} md={10} lg={8}>
              <Paper elevation={1} className={classes.paper}>
                <Typography variant="h3">Volume Request Options</Typography>
                <Typography variant="body1">
                  {JSON.stringify(trial, null, 2)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default RequestVolume
