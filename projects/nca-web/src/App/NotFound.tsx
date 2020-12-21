import NcaNotFound from '@cjo3/shared/assets/svgs/nca-not-found'
import { clickWindowLink } from '@cjo3/shared/react/helpers'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import React from 'react'
import { useSelector } from 'react-redux'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'

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
    title: {
      ...theme.typography.shareTechMono,
      width: '100%',
      letterSpacing: -1,
      color: theme.palette.primary.main,
      textTransform: 'uppercase'
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
      width: '100%',
      margin: `${theme.custom.setSpace()}px 0 0 0`
    },
    button: {
      marginTop: theme.custom.setSpace()
    }
  }),
  { name: 'NotFound' }
)

export const NotFound: React.FC = (): JSX.Element | null => {
  const classes = useStyles()

  const content = useSelector(state => state.content.error)

  if (!content) return null

  const clickHandler = (): void => {
    clickWindowLink('/')
  }

  return (
    <Grid className={classes.container}>
      <Grid className={classes.contentContainer}>
        <Grid className={classes.innerContainer}>
          <FadeIn direction="x" position={-100}>
            <img src={NcaNotFound} alt={content[0]} className={classes.image} />
          </FadeIn>
          <Grid className={classes.text}>
            <FadeIn direction="x" position={100}>
              <Typography variant="h1" className={classes.title}>
                {content[1]}
              </Typography>
            </FadeIn>
            <FadeIn direction="x" position={100}>
              <Typography variant="body1" className={classes.message}>
                {content[2]}
              </Typography>
            </FadeIn>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={clickHandler}
              className={classes.button}>
              <HomeIcon className={classes.homeIcon} />
              &ensp;{content[3]}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
