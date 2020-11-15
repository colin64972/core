import { Grid, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

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

interface Props {
  style: string
}

export const Footer: React.FC<Props> = ({ style }): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container component="footer" className={clsx(style, classes.footer)}>
      <Grid item xs={12}>
        <Typography variant="h6" color="primary">
          Footer
        </Typography>
      </Grid>
    </Grid>
  )
}
