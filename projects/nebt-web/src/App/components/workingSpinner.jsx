import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  item: {
    ...theme.custom.flexColumnCentered,
    minHeight: '10rem'
  },
  subtitle: {
    fontWeight: 'normal',
    color: theme.palette.grey[600]
  },
  spinner: {
    marginBottom: theme.custom.setSpace()
  }
}))

export default ({ ...props }) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} className={classes.item}>
      <CircularProgress
        color="primary"
        className={classes.spinner}
        size="2rem"
      />
      <Typography variant="body1" className={classes.subtitle} align="center">
        Transaction in Progress
      </Typography>
    </Grid>
  )
}
