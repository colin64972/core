import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    overflow: 'scroll',
    padding: theme.custom.setSpace(),
    background: theme.palette.grey[800],
    boxShadow: theme.shadows[5]
  },
  title: {
    color: theme.palette.grey[400]
  }
}))

export default ({ title, children }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      {children}
    </Paper>
  )
}
