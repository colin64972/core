import NcaNotFound from '@cjo3/shared/assets/svgs/nca-not-found'
import { clickWindowLink } from '@cjo3/shared/react/helpers'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import React from 'react'

const useStyles = makeStyles(
  theme => ({
    container: {
      ...theme.custom.setFlex(),
      minHeight: '67vh',
      background: theme.custom.setLinearGradient(
        180,
        theme.palette.grey[300],
        'white'
      )
    },
    contentContainer: {
      ...theme.custom.contentContainer,
      padding: `${theme.custom.setSpace('md')}px ${theme.custom.setSpace(
        'sm'
      )}px`
    },
    innerContainer: {
      borderRadius: 4,
      ...theme.custom.setFlex('column'),
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setFlex('row', 'flex-start')
      }
    },
    image: {
      width: 200,
      [theme.breakpoints.up('sm')]: {
        width: 250
      }
    },
    text: {
      margin: `${theme.custom.setSpace('sm')}px 0 0 0`,
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left',
        margin: `0 0 0 ${theme.custom.setSpace('sm')}px`
      }
    },
    message: {
      margin: `${theme.custom.setSpace()}px 0 0 0`
    },
    button: {
      marginTop: theme.custom.setSpace()
    }
  }),
  { name: 'NotFound' }
)

export const NotFound: React.FC = (): JSX.Element => {
  const classes = useStyles()
  const clickHandler = (): void => {
    clickWindowLink('/')
  }
  return (
    <Grid className={classes.container}>
      <Grid className={classes.contentContainer}>
        <Grid className={classes.innerContainer}>
          <img
            src={NcaNotFound}
            alt="not-found-image"
            className={classes.image}
          />
          <Grid className={classes.text}>
            <Typography variant="h1">Not Found</Typography>
            <Typography variant="body1" className={classes.message}>
              Sorry, the requested page could not be found
            </Typography>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={clickHandler}
              className={classes.button}>
              <HomeIcon className={classes.homeIcon} />
              &ensp;Home
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
