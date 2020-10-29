import React from 'react'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'
import { defaultPadding } from '@cjo3/shared/react/themes/theming'
import { Grid, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { makeStyles } from '@material-ui/core/styles'
import { ImageHandler } from '@cjo3/shared/react/components/ImageHandler'
import { Intro as IntroImage } from '../../../assets'

const useStyles = makeStyles(theme => ({
  introSection: {
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace),
    backgroundColor: theme.palette.grey[100]
  },
  icon: {
    fontSize: theme.custom.setSpace('xl')
  },
  mainHeading: {
    ...theme.typography.mainHeading,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  subHeading: {
    ...theme.typography.subHeading,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  body: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  imageContainer: {
    ...theme.custom.setFlex(),
    height: '100%',
    margin: `0 0 0 ${theme.custom.setSpace('sm')}px`,
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.custom.setSpace()}px 0 0 0 `
    }
  },
  introImage: {
    width: '100%',
    maxWidth: 500
  },
  valuePropContainer: {
    marginTop: theme.custom.setSpace('sm'),
    borderRadius: theme.custom.setSpace() / 2,
    padding: theme.custom.setSpace('sm'),
    background: `linear-gradient(0deg, ${theme.palette.grey[100]}, ${theme.palette.secondary[100]})`
  },
  valuePropFadeIn: {
    ...theme.custom.setFlex(),
    width: '100%'
  },
  valuePropTitle: {
    ...theme.typography.bold,
    textAlign: 'center',
    lineHeight: 1.25,
    fontSize: theme.typography.fontSize * 1.5,
    textTransform: 'uppercase'
  },
  itemFadeIn: {
    'marginTop': theme.custom.setSpace(),
    '&:first-child  ': {
      marginTop: 0
    }
  },
  valuePropPoint: {
    ...theme.custom.setFlex('row', 'flex-start'),
    ...theme.typography.body1,
    width: '100%',
    borderRadius: theme.custom.setSpace() / 2
  },
  valuePropLeft: {
    ...theme.custom.setFlex(),
    padding: theme.custom.setSpace(),
    width: '100%'
  },
  valuePropRight: {
    ...theme.custom.setFlex(),
    width: '100%',
    padding: theme.custom.setSpace()
  },
  list: {
    ...theme.custom.cleanList,
    width: '100%'
  },
  checkIcon: {
    marginRight: theme.custom.setSpace()
  }
}))

export const Intro = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12} component="section" className={classes.introSection}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <FadeIn direction="y" position={-100}>
            <Typography component="h4" className={classes.subHeading}>
              Keyword Optimization Tool
            </Typography>
          </FadeIn>
          <FadeIn direction="x" position={-100}>
            <Typography component="h3" className={classes.mainHeading}>
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
              query language to attract your chosen audience.
            </Typography>
          </FadeIn>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FadeIn
            direction="x"
            position={100}
            outerClass={classes.imageContainer}>
            <ImageHandler asset={IntroImage} styleClass={classes.introImage} />
          </FadeIn>
        </Grid>
      </Grid>

      <Grid container justify="center">
        <FadeIn>
          <Grid item xs={12} className={classes.valuePropContainer}>
            <Grid container>
              <Grid item xs={12} sm={6} className={classes.valuePropLeft}>
                <FadeIn direction="y" position={100}>
                  <Typography component="h4" className={classes.valuePropTitle}>
                    This online marketing
                    <br />
                    tool can help you&#58;
                  </Typography>
                </FadeIn>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.valuePropRight}>
                <ul className={classes.list}>
                  <FadeIn
                    direction="x"
                    position={100}
                    outerClass={classes.itemFadeIn}>
                    <li className={classes.valuePropPoint}>
                      <CheckIcon
                        color="primary"
                        className={classes.checkIcon}
                      />
                      mulitply and combine keywords to uncover new targeting
                      opportunities
                    </li>
                  </FadeIn>
                  <FadeIn
                    direction="x"
                    position={100}
                    outerClass={classes.itemFadeIn}>
                    <li className={classes.valuePropPoint}>
                      <CheckIcon
                        color="primary"
                        className={classes.checkIcon}
                      />
                      look up keyword search volume, CPC and competition metrics
                    </li>
                  </FadeIn>
                  <FadeIn
                    direction="x"
                    position={100}
                    outerClass={classes.itemFadeIn}>
                    <li className={classes.valuePropPoint}>
                      <CheckIcon
                        color="primary"
                        className={classes.checkIcon}
                      />
                      evaluate and compare keyword variations
                    </li>
                  </FadeIn>
                  <FadeIn
                    direction="x"
                    position={100}
                    outerClass={classes.itemFadeIn}>
                    <li className={classes.valuePropPoint}>
                      <CheckIcon
                        color="primary"
                        className={classes.checkIcon}
                      />
                      mix and match keywords with domain TLDs to find
                      keyword&ndash;driven domains
                    </li>
                  </FadeIn>
                </ul>
              </Grid>
            </Grid>
          </Grid>
        </FadeIn>
      </Grid>
    </Grid>
  )
}
