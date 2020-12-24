import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import types from '../../store/types'

const useStyles = makeStyles(theme => ({
  item: {
    ...theme.custom.flexColumnCentered,
    padding: theme.custom.setSpace('sm'),
    background: theme.palette.gradients.error,
    boxShadow: theme.custom.shadows.inset,
    minHeight: 300
  },
  body1: {
    color: theme.palette.common.white,
    maxWidth: 350
  },
  connectButton: {
    marginTop: theme.custom.setSpace('sm'),
    color: 'white',
    borderColor: 'white'
  }
}))

export default () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  function connectHandler(event) {
    dispatch({
      type: types.CONNECT_DAPP,
      windowEthereum: window?.ethereum
    })
  }

  return (
    <Grid container>
      <Grid item xs={12} className={classes.item}>
        <Typography variant="h4" align="center">
          No Connection
        </Typography>
        <Typography variant="body1" align="center" className={classes.body1}>
          Click the button below to connect with your current wallet account
        </Typography>
        <Button
          type="button"
          variant="outlined"
          onClick={connectHandler}
          className={classes.connectButton}>
          Connect
        </Button>
      </Grid>
    </Grid>
  )
}
