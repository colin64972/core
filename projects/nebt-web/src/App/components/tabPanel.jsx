import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  fullWidth: {
    width: '100%',
  },
}))

export default ({ ...props }) => {
  const classes = useStyles()
  return (
    <Grid
      role="tabpanel"
      hidden={props.tab !== props.index}
      id={props.index}
      className={classes.fullWidth}>
      {props.child}
    </Grid>
  )
}
