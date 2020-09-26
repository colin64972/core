import React from 'react'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { defaultPadding } from '@colin30/shared/react/theming'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { ImageHandler } from '@colin30/shared/react/components/ImageHandler'
import { Intro as IntroImage } from '../../../assets'

const useStyles = makeStyles(theme => ({
  introSection: {
    backgroundColor: theme.palette.grey[100],
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace)
  },
  icon: {
    fontSize: theme.custom.setSpace('xl')
  },
  subHeading: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  mainHeading: {
    width: '100%',
    ...theme.typography.mainHeading,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  body: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  introImage: {
    width: '100%',
    maxWidth: 600,
    margin: `0 0 0 ${theme.custom.setSpace('sm')}px`,
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.custom.setSpace()}px 0 0 0 `
    }
  }
}))

export const Intro = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} component="section" className={classes.introSection}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6}>
          <FadeIn direction="y" position={-100}>
            <Typography variant="subtitle2" className={classes.subHeading}>
              Online Visibility Search Optimization Tool
            </Typography>
          </FadeIn>
          <FadeIn direction="x" position={-100}>
            <Typography variant="h4" className={classes.mainHeading}>
              Discover the Right Keywords that Satisfy your Audience&apos;s
              Search Intent
            </Typography>
          </FadeIn>
          <FadeIn direction="y" position={100}>
            <Typography variant="body1" className={classes.body}>
              You produce great content&mdash;whether it be your landing pages,
              online ads, blog articles, podcasts, YouTube videos or other
              media&mdash;your audience is waiting to engage with it. But before
              you hit the publish button, use this simple content marketing tool
              to help guide your audience to your message. By using this tool,
              you can easily compare and evaluate variations in search query
              phrases to find the most compatible combination of keywords that
              will effectively grab your audience&apos;s attention.
            </Typography>
          </FadeIn>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FadeIn direction="x" position={100}>
            <ImageHandler asset={IntroImage} styleClass={classes.introImage} />
          </FadeIn>
        </Grid>
      </Grid>
    </Grid>
  )
}
