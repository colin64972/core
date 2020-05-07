import React from 'react'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { defaultPadding } from '@colin30/shared/react/theming'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import IntroImage from '../../exports/images/intro-image-1000w.png'

const useStyles = makeStyles(theme => ({
  introSection: {
    backgroundColor: theme.palette.grey[100],
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace)
  },
  icon: {
    fontSize: theme.custom.setSpace('xl')
  },
  mainHeading: theme.typography.mainHeading,
  image: {
    width: '100%',
    maxWidth: 500,
    padding: `0 0 0 ${theme.custom.setSpace('sm')}px`,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.custom.setSpace()}px 0 0 0 `
    }
  }
}))

export const Intro = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} component="section" className={classes.introSection}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6}>
          <FadeIn
            direction="y"
            position={-100}
            component={
              <Typography variant="subtitle2">Target Acquired</Typography>
            }
          />
          <FadeIn
            direction="x"
            position={-100}
            component={
              <Typography variant="h4" className={classes.mainHeading}>
                The Best SEO &amp; PPC Keyword Multiplier
              </Typography>
            }
          />
          <FadeIn
            direction="y"
            position={100}
            component={
              <Typography variant="body1">
                Amet sit accusam eos sed consetetur, dolor voluptua dolore sea
                sit. Justo eirmod dolor gubergren kasd nonumy invidunt at labore
                invidunt. Sit sea eos ipsum sed, et ipsum sit ut dolor justo
                vero, sea accusam diam erat vero eos. Accusam sed dolores
                accusam stet ut sit nonumy at, et eos et consetetur labore et
                voluptua. Diam diam sea eirmod eos ipsum est kasd erat kasd.
                Dolores at stet sanctus sanctus elitr est erat dolor ipsum, sed
                sed et no kasd, sadipscing rebum consetetur ut stet dolore sit.
                Sea elitr justo at dolor. Vero tempor diam diam ut nonumy amet
                clita.
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container justify="center">
            <FadeIn
              direction="x"
              position={100}
              component={<img src={IntroImage} className={classes.image} />}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
