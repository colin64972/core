import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.custom.setSpace('sm'),
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.grey[900],
      theme.palette.grey[800]
    )
  }
}))

export const Footer: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container component="footer" className={classes.footer}>
      <Grid item xs={12}>
        <Typography variant="h6" color="primary">
          Footer
        </Typography>
      </Grid>
    </Grid>
  )
}
