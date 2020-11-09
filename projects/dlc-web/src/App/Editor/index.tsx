import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { TopNav } from '../TopNav'
import { FileLoader } from './FileLoader'
import { SheetSelector } from './SheetSelector'
import { TransformSettings } from './TransformSettings'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace('sm')
  },
  Editor_header: {
    padding: theme.custom.setSpace('lg'),
    backgroundImage:
      'url(https://images.ctfassets.net/91sm3pewxzag/59jPKS6AVO44eeKgUWySCs/cbf12ea9d82c1561da9c2eb331b4c612/featured_laptop-spreadsheet-2.jpg?w=950)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'screen',
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  fileLoaderBg: {
    background: `linear-gradient(top, ${theme.palette.primary[100]}, white)`
  },
  editorSettingsBg: {
    background: `linear-gradient(bottom, ${theme.palette.grey[900]}, ${theme.palette.grey[800]})`,
    boxShadow: '0.5rem 0.5rem 2rem rgba(0, 0, 0, 0.1)'
  }
}))

export const Editor = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Grid container>
      <TopNav />
      <Grid
        component="header"
        container
        justify="center"
        className={classes.Editor_header}>
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
    </Grid>
  )
}
