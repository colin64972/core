import NcaLogoWhite from '@cjo3/shared/assets/svgs/nca-logo-white'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { BgContainer } from '../BgContainer'
import NcaHome from '@cjo3/shared/assets/svgs/nca-home'
import { Hero } from '../Hero'

const useStyles = makeStyles(
  theme => ({
    headerTitle: {
      width: '100%',
      fontFamily: 'Share Tech Mono',
      textTransform: 'uppercase',
      color: 'white',
      fontSize: theme.typography.fontSize * 4,
      lineHeight: 1,
      fontWeight: 'normal',
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left'
      }
    },
    headerStroke: {
      width: 100,
      height: 5,
      backgroundColor: 'white',
      margin: `${theme.custom.setSpace('sm')}px auto`,
      [theme.breakpoints.up('sm')]: {
        margin: `${theme.custom.setSpace('sm')}px`,
        marginLeft: 0
      }
    },
    subtitleContainer: {
      ...theme.custom.setFlex('column'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setFlex('row', 'space-between')
      }
    },
    subtitleHeading: {
      width: '100%',
      fontFamily: 'Share Tech Mono',
      color: theme.palette.bodyColor,
      fontSize: theme.typography.fontSize * 2,
      lineHeight: 1,
      fontWeight: 'normal',
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left'
      }
    },
    subtitleLogo: {
      width: 100,
      marginTop: theme.custom.setSpace('sm'),
      [theme.breakpoints.up('sm')]: {
        marginTop: 0
      }
    }
  }),
  {
    name: 'Home'
  }
)

export const Home: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container justify="center">
      <BgContainer bottom right bgColor="theme.palette.primary.main">
        <Typography variant="h2" className={classes.headerTitle}>
          Colin
          <br />
          {process.env.APP_NAME}
        </Typography>
        <Grid className={classes.headerStroke} />
        <Grid className={classes.subtitleContainer}>
          <Typography variant="h3" className={classes.subtitleHeading}>
            full stack
            <br />
            javascript
            <br />
            design &amp;
            <br />
            development
          </Typography>
          <img
            src={NcaLogoWhite}
            alt="logo-white"
            className={classes.subtitleLogo}
          />
        </Grid>
      </BgContainer>
      <Hero
        src={NcaHome}
        tagline="Let's build an online experience together"
        alt="home-image"
      />
      <Grid container>
        <BgContainer top right bgColor="theme.palette.grey[300]">
          <Typography variant="h4">Marketing</Typography>
          <Typography variant="body1">
            Marketing strategy should be the core of your online presence and
            baked into each page of your website. From content planning to
            technical SEO, social media and PPC, I can help put your best foot
            forward.
          </Typography>
        </BgContainer>
      </Grid>
    </Grid>
  )
}
