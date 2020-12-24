import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Viewable from '../components/viewable'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserAccount } from '../../store/selectors'
import { setAnimation } from '../helpers'

const useStyles = makeStyles(theme => ({
  item: {
    ...theme.custom.flexColumnCentered,
    padding: theme.custom.setSpace('sm'),
    background: theme.palette.gradients.error,
    boxShadow: theme.custom.shadows.inset,
    minHeight: 200
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

export default ({ ...props }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const account = useSelector(state => selectUserAccount(state))

  console.log('%c account', 'color: yellow; font-size: large', account)

  function connectHandler(event) {
    console.log('%c connectHandler', 'color: yellow; font-size: large', event)
  }

  return (
    <Viewable
      animation={setAnimation('x', -100)}
      component={
        <Grid container>
          <Grid item xs={12} className={classes.item}>
            <Typography variant="h4" align="center">
              No Wallet Connection
            </Typography>
            <Typography
              variant="body1"
              align="center"
              className={classes.body1}>
              Click here to allow the exchange to access your wallet accounts
            </Typography>
            <Button
              type="button"
              variant="outlined"
              onClick={connectHandler}
              className={classes.connectButton}>
              Connect asdf asdf asdf asdf
            </Button>
          </Grid>
        </Grid>
      }
    />
  )
}
