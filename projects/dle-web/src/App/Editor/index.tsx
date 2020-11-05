import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { TopNav } from '../TopNav'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace()
  }
}))

export const Editor = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container>
      <TopNav />
      <Grid component="section" container className={classes.section}>
        <Grid item xs={12}></Grid>
      </Grid>
    </Grid>
  )
}
