import { Grid, Button, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { FileLoader } from './FileLoader'
import { SheetSelector } from './SheetSelector'
import { TransformResults } from './TransformResults'
import { TransformSettings } from './TransformSettings'
import { Link } from 'react-router-dom'
import { switchLinkRoutePath } from '@cjo3/shared/react/helpers'

const useStyles = makeStyles(theme => ({
  Editor_headerBg: {
    backgroundImage:
      'url(https://eskipaper.com/images/high-tech-wallpapers-3.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  Editor_headerContent: {
    ...theme.custom.setFlex('column'),
    padding: theme.custom.setSpace('sm'),
    color: theme.palette.grey[50],
    textShadow: theme.custom.textShadow
  },
  Editor_headerInstructionsButton: {
    marginTop: theme.custom.setSpace('sm')
  },
  Editor_contentContainer: {
    ...theme.custom.contentContainer
  }
}))

export const Editor: React.FC = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Grid container justify="center">
      <Grid
        container
        component="header"
        justify="center"
        className={classes.Editor_headerBg}>
        <Grid
          container
          className={clsx(
            classes.Editor_contentContainer,
            classes.Editor_headerContent
          )}>
          <Typography variant="h1" align="center">
            Editor
          </Typography>
          <Typography variant="body1" align="center">
            Labore labore ut est sit sanctus stet et. Eos lorem ipsum consetetur
            magna est voluptua. Lorem justo dolor eirmod est est aliquyam. Dolor
            sit kasd nonumy lorem tempor dolor no duo et, invidunt gubergren
            rebum at rebum, et nonumy lorem lorem diam ipsum, sadipscing diam
            voluptua accusam sit sit, dolor.
          </Typography>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className={classes.Editor_headerInstructionsButton}
            href={switchLinkRoutePath(
              '/editor/guide',
              `${process.env.APP_ROOT_PATH}/editor/guide`
            )}>
            Guide
          </Button>
        </Grid>
      </Grid>
      <FileLoader />
      <SheetSelector />
      <TransformSettings />
      <TransformResults />
    </Grid>
  )
}
