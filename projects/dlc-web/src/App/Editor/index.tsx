import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { FileLoader } from './FileLoader'
import { Preview } from './Preview/'
import { SheetSelector } from './SheetSelector'
import { TransformResults } from './TransformResults'
import { TransformSettings } from './TransformSettings'

const useStyles = makeStyles(theme => ({
  Editor_header: {
    width: '100%',
    padding: theme.custom.setSpace('lg'),
    backgroundImage:
      'url(https://eskipaper.com/images/high-tech-wallpapers-3.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: theme.palette.grey[50],
    textShadow: '0 0 0.5rem rgba(0, 0, 0, 0.5)'
  }
}))

export const Editor: React.FC = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item component="header" className={classes.Editor_header}>
        <Typography variant="h1" align="center">
          Editor
        </Typography>
        <Typography variant="body1" align="center">
          Labore labore ut est sit sanctus stet et. Eos lorem ipsum consetetur
          magna est voluptua. Lorem justo dolor eirmod est est aliquyam. Dolor
          sit kasd nonumy lorem tempor dolor no duo et, invidunt gubergren rebum
          at rebum, et nonumy lorem lorem diam ipsum, sadipscing diam voluptua
          accusam sit sit, dolor.
        </Typography>
      </Grid>
      <FileLoader />
      <SheetSelector />
      <TransformSettings />
      <TransformResults />
      <Preview />
    </Grid>
  )
}
