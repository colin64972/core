import { Grid, Typography, Button } from '@material-ui/core'
import { switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { NotFoundBg } from '../assets'
import { Header } from './Header'

const useStyles = makeStyles(
  theme => ({
    NotFound_container: {
      height: '100%',
      background: theme.custom.setLinearGradient(
        180,
        theme.palette.grey[700],
        theme.palette.grey[800]
      )
    },
    NotFound_contentContainer: {
      ...theme.custom.contentContainer,
      ...theme.custom.setFlex('column'),
      padding: theme.custom.setSpace('sm')
    },
    NotFound_title: {
      color: theme.palette.grey[50],
      textShadow: theme.custom.textShadow
    },
    NotFound_subTitle: {
      color: theme.palette.grey[300],
      marginTop: theme.custom.setSpace(),
      textShadow: theme.custom.textShadow,
      fontWeight: 'normal'
    },
    NotFound_button: {
      marginTop: theme.custom.setSpace('sm')
    }
  }),
  {
    name: 'NotFound'
  }
)

export const NotFound: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid
      container
      justify="center"
      alignItems="flex-start"
      className={classes.NotFound_container}>
      <Header bgColor="theme.palette.grey[900]" bgUrls={NotFoundBg.paths} />
      <Grid className={classes.NotFound_contentContainer}>
        <Typography
          variant="h1"
          align="center"
          className={classes.NotFound_title}>
          Error
        </Typography>
        <Typography
          variant="h4"
          align="center"
          className={classes.NotFound_subTitle}>
          Sorry, something went wrong
        </Typography>
        <Button
          type="button"
          color="secondary"
          variant="contained"
          className={classes.NotFound_button}
          href={switchLinkRoutePath('/')}>
          Back to Home
        </Button>
      </Grid>
    </Grid>
  )
}
