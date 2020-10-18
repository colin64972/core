import React from 'react'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { defaultPadding } from '@colin30/shared/react/theming'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'
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
  },
  valuePropContainer: {
    ...theme.custom.borderRadius,
    backgroundColor: theme.palette.secondary[100],
    marginTop: theme.custom.setSpace('sm'),
    padding: theme.custom.setSpace('sm')
  },
  valuePropFadeIn: {
    ...theme.custom.setFlex(),
    width: '100%'
  },
  valuePropTitle: {
    textAlign: 'center',
    lineHeight: 1.25
  },
  valuePropPoint: {
    ...theme.typography.body1,
    ...theme.custom.setFlex('row', 'flex-start'),
    fontWeight: 'unset',
    textTransform: 'unset'
  },
  valuePropLeft: {
    ...theme.custom.setFlex(),
    padding: theme.custom.setSpace(),
    width: '100%'
  },
  valuePropRight: {
    ...theme.custom.border,
    padding: theme.custom.setSpace(),
    backgroundColor: theme.palette.secondary[50],
    ...theme.custom.setFlex()
  },
  list: {
    ...theme.custom.cleanList
  },
  checkIcon: {
    marginRight: theme.custom.setSpace()
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
              Discover Keywords that Satisfy your Audience&apos;s Search Intent
            </Typography>
          </FadeIn>
          <FadeIn direction="y" position={100}>
            <Typography variant="body1" className={classes.body}>
              You produce great content and your audience is waiting to engage
              with it. Whether it be your landing pages, online ads, blog
              articles, podcasts, YouTube videos or other media&mdash;your
              content deserves to be seen online. So, before you hit the publish
              button, make sure you&apos;re using the right keywords and search
              query language to target your chosen audience.
            </Typography>
          </FadeIn>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FadeIn direction="x" position={100}>
            <ImageHandler asset={IntroImage} styleClass={classes.introImage} />
          </FadeIn>
        </Grid>
        <Grid item xs={12} className={classes.valuePropContainer}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={4} className={classes.valuePropLeft}>
              <FadeIn
                direction="y"
                position={100}
                className={classes.valuePropFadeIn}>
                <Typography variant="h3" className={classes.valuePropTitle}>
                  This content marketing tool can help you easily&#58;
                </Typography>
              </FadeIn>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.valuePropRight}>
              <ul className={classes.list}>
                <li className={classes.valuePropPoint}>
                  <CheckIcon color="primary" className={classes.checkIcon} />
                  mulitply and combine keywords to uncover new targeting
                  opportunities
                </li>
                <li className={classes.valuePropPoint}>
                  <CheckIcon color="primary" className={classes.checkIcon} />
                  look up keyword search volume, CPC and competition metrics
                </li>
                <li className={classes.valuePropPoint}>
                  <CheckIcon color="primary" className={classes.checkIcon} />
                  evaluate and compare search query keyword variants
                </li>
                <li className={classes.valuePropPoint}>
                  <CheckIcon color="primary" className={classes.checkIcon} />
                  mix and match keywords with domain TLDs to find
                  keyword&ndash;driven domains
                </li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
