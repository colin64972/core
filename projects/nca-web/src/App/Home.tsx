import NcaLogoWhite from '@cjo3/shared/assets/svgs/nca-logo-white'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import MemoryIcon from '@material-ui/icons/Memory'
import OpacityIcon from '@material-ui/icons/Opacity'
import InsertChartIcon from '@material-ui/icons/InsertChart'
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { ContentContainer } from './ContentContainer'
import NcaHome from '@cjo3/shared/assets/svgs/nca-home'
import { HeroBar } from './HeroBar'
import { AngleBand } from './AngleBand'
import TrackChangesIcon from '@material-ui/icons/TrackChanges'
import { NavButtonSet } from './NavButtonSet'
import clsx from 'clsx'

const useStyles = makeStyles(
  theme => ({
    headerTitle: {
      width: '100%',
      ...theme.typography.shareTechMono,
      textTransform: 'uppercase',
      color: 'white',
      fontSize: theme.typography.fontSize * 4,
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
      ...theme.typography.shareTechMono,
      color: theme.palette.bodyColor,
      fontSize: theme.typography.fontSize * 2,
      textTransform: 'unset',
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
    },
    intro: {
      ...theme.custom.setFlex('column'),
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setFlex('row')
      },
      [theme.breakpoints.up('md')]: {
        ...theme.custom.setFlex('row', 'flex-start')
      }
    },
    introInner: {
      maxWidth: 500
    },
    introIcon: {
      fontSize: theme.typography.fontSize * 4,
      margin: `0 0 ${theme.custom.setSpace()}px 0`,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.fontSize * 5,
        margin: `0 ${theme.custom.setSpace('sm')}px 0 0`
      }
    },
    introTitle: {
      ...theme.typography.shareTechMono,
      maxWidth: 500,
      fontSize: theme.typography.fontSize * 2,
      color: theme.palette.primary.main,
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left'
      }
    },
    introText: {
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left'
      }
    },
    helpCases: {
      ...theme.custom.setFlex('column'),
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setFlex('row', 'flex-start')
      }
    },
    helpCasesIcon: {
      fontSize: theme.typography.fontSize * 5,
      margin: `0 0 ${theme.custom.setSpace()}px 0`,
      [theme.breakpoints.up('sm')]: {
        margin: `0 ${theme.custom.setSpace('sm')}px 0 0`
      }
    },
    helpCasesTitle: {
      ...theme.typography.shareTechMono,
      color: theme.palette.primary.main,
      fontSize: theme.typography.fontSize * 2,
      textAlign: 'center',
      maxWidth: 500,
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left'
      }
    },
    helpCasesGrid: {
      ...theme.custom.setGrid(1, 3, theme.custom.setSpace('sm')),
      marginTop: theme.custom.setSpace('md'),
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setGrid(3, 1, theme.custom.setSpace('sm'))
      }
    },
    helpCaseMarketing: {
      gridColumn: '1 / 2',
      gridRow: 1,
      [theme.breakpoints.up('sm')]: {
        gridColumn: '1 / 2'
      }
    },
    helpCaseDesign: {
      gridColumn: '1 / 2',
      gridRow: 2,
      [theme.breakpoints.up('sm')]: {
        gridColumn: '2 / 3',
        gridRow: 1
      }
    },
    helpCaseDevelopment: {
      gridColumn: '1 / 2',
      gridRow: 3,
      [theme.breakpoints.up('sm')]: {
        gridColumn: '3 / 4',
        gridRow: 1
      }
    },
    helpCaseBg: {
      ...theme.custom.setFlex('column', 'flex-start'),
      background: `linear-gradient(180deg, white 30px, ${theme.palette.grey[200]} 30px, white)`,
      position: 'relative',
      [theme.breakpoints.only('sm')]: {
        background: 'unset'
      }
    },
    helpCaseIcon: {
      fontSize: theme.typography.fontSize * 3,
      marginBottom: theme.custom.setSpace(),
      position: 'relative'
    },
    helpCaseTitle: {
      ...theme.typography.shareTechMono,
      color: theme.palette.primary.main,
      fontSize: theme.typography.fontSize * 1.5
    },
    helpCaseText: {
      textAlign: 'center',
      padding: `0 ${theme.custom.setSpace('sm')}px ${theme.custom.setSpace(
        'sm'
      )}px ${theme.custom.setSpace('sm')}px`,
      [theme.breakpoints.only('sm')]: {
        padding: `0 0 ${theme.custom.setSpace('sm')}px 0`
      }
    },
    helpCaseAngle: {
      width: '100%',
      backgroundColor: theme.palette.grey[200],
      height: theme.custom.setSpace('sm'),
      position: 'absolute',
      [theme.breakpoints.only('sm')]: {
        backgroundColor: 'unset'
      }
    },
    angleLeft: {
      clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
    },
    angleRight: {
      clipPath: 'polygon(0 100%, 100% 0%, 100% 100%)'
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
      <ContentContainer bgColor="theme.palette.primary.main">
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
            JavaScript
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
      </ContentContainer>
      <AngleBand bottom right bgColor="theme.palette.primary.main" />
      <HeroBar
        src={NcaHome}
        tagline="Let's build an online experience together"
        alt="home-image"
      />
      <AngleBand top left bgColor="theme.palette.grey[200]" />
      <ContentContainer gradient="theme.custom.setLinearGradient(180, theme.palette.grey[200], 'white')">
        <Grid container>
          <Grid item xs={12} md={8} className={classes.intro}>
            <OpenInBrowserIcon color="primary" className={classes.introIcon} />
            <Grid className={classes.introInner}>
              <Typography variant="h4" className={classes.introTitle}>
                it&apos;s not the idea, it&apos;s the commitment and execution
              </Typography>
              <Typography variant="body1" className={classes.introText}>
                In today’s inter&ndash;connected world, your business needs to
                be online with more than a basic webpage. However, building a
                performant, search&ndash;visible and lead&ndash;generating
                online experience is a complex process for even the largest of
                companies. With a background in graphic design, education in
                marketing and modern programming skills, I can help bring your
                brand&apos;s web presence to life with a focus on conversions
                and revenue generation.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <NavButtonSet midNav slice={1} color="theme.palette.grey[500]" />
          </Grid>
        </Grid>
      </ContentContainer>
      <ContentContainer>
        <Grid className={classes.helpCases}>
          <TrackChangesIcon color="primary" className={classes.helpCasesIcon} />
          <Typography variant="h4" className={classes.helpCasesTitle}>
            how i can help you achieve your online goals
          </Typography>
        </Grid>
        <Grid className={classes.helpCasesGrid}>
          <Grid className={clsx(classes.helpCaseBg, classes.helpCaseMarketing)}>
            <Grid className={clsx(classes.helpCaseAngle, classes.angleRight)} />
            <InsertChartIcon className={classes.helpCaseIcon} />
            <Typography variant="h4" className={classes.helpCaseTitle}>
              marketing
            </Typography>
            <Typography variant="body1" className={classes.helpCaseText}>
              Marketing strategy should be the core of your online presence and
              baked into each page of your website. From content planning to
              technical SEO, social media and PPC, let me help you earn
              visibility and gain users.
            </Typography>
          </Grid>
          <Grid className={clsx(classes.helpCaseBg, classes.helpCaseDesign)}>
            <Grid className={clsx(classes.helpCaseAngle, classes.angleRight)} />
            <OpacityIcon className={classes.helpCaseIcon} />
            <Typography variant="h4" className={classes.helpCaseTitle}>
              design
            </Typography>
            <Typography variant="body1" className={classes.helpCaseText}>
              The design and UI of your webpage is not superficial. Numerous
              studies have proven that users give more trust and credibility to
              well-designed, aesthetically pleasing websites. Allow me to you
              craft a beautiful digital experience.
            </Typography>
          </Grid>
          <Grid
            className={clsx(classes.helpCaseBg, classes.helpCaseDevelopment)}>
            <Grid className={clsx(classes.helpCaseAngle, classes.angleRight)} />
            <MemoryIcon className={classes.helpCaseIcon} />
            <Typography variant="h4" className={classes.helpCaseTitle}>
              development
            </Typography>
            <Typography variant="body1" className={classes.helpCaseText}>
              Gone are the days of static websites, you need a dynamic web
              application that provides rich data to users. I use modern
              JavaScript and NodeJs to build interactive front-end clients and
              data-providing back-end services.
            </Typography>
          </Grid>
        </Grid>
      </ContentContainer>
    </Grid>
  )
}
