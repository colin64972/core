import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  Instructions_header: {
    padding: theme.custom.setSpace('sm')
  }
}))

interface Props {}

export const Instructions: React.FC<Props> = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item component="header" className={classes.Instructions_header}>
        <Typography variant="h1" align="center">
          Instructions
        </Typography>
        <Typography variant="body1" align="center">
          Labore labore ut est sit sanctus stet et. Eos lorem ipsum consetetur
          magna est voluptua. Lorem justo dolor eirmod est est aliquyam. Dolor
          sit kasd nonumy lorem tempor dolor no duo et, invidunt gubergren rebum
          at rebum, et nonumy lorem lorem diam ipsum, sadipscing diam voluptua
          accusam sit sit, dolor.
        </Typography>
      </Grid>
    </Grid>
  )
}
