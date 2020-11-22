import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(
  theme => ({
    padding: {
      padding: theme.custom.setSpace('sm')
    }
  }),
  {
    name: 'Test'
  }
)

export const Test: React.FC = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item className={classes.padding}></Grid>
    </Grid>
  )
}
