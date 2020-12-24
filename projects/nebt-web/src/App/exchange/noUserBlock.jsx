import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import types from '../../store/types'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  item: {
    ...theme.custom.flexColumnCentered,
    padding: theme.custom.setSpace('sm'),
    background: theme.palette.gradients.error,
    boxShadow: theme.custom.shadows.inset,
  },
  body1: {
    color: theme.palette.common.white,
    maxWidth: 750/2
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
          No Wallet Account
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
