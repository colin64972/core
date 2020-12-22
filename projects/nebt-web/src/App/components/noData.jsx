import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  item: {
    ...theme.custom.flexColumnCentered,
    minHeight: '10rem',
  },
  subtitle: {
    fontWeight: 'normal',
    color: theme.palette.grey[600],
  },
}))

export default ({ ...props }) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} className={classes.item}>
      <Typography variant="body1" className={classes.subtitle} align="center">
        No Data for Current MetaMask Account
      </Typography>
    </Grid>
  )
}
