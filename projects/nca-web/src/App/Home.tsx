import NcaHome from '@cjo3/shared/assets/svgs/nca-home'
import NcaLogoWhite from '@cjo3/shared/assets/svgs/nca-logo-white'
import { setHtml } from '@cjo3/shared/react/helpers'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InsertChartIcon from '@material-ui/icons/InsertChart'
import MemoryIcon from '@material-ui/icons/Memory'
import OpacityIcon from '@material-ui/icons/Opacity'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser'
import TrackChangesIcon from '@material-ui/icons/TrackChanges'
import clsx from 'clsx'
import React from 'react'
import { useSelector } from 'react-redux'
import { AngleBand } from './AngleBand'
import { ContentContainer } from './ContentContainer'
import { HeroBar } from './HeroBar'
import { NavButtonSet } from './NavButtonSet'
import { ResponsiveAngle } from './ResponsiveAngle'

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
      margin: `${theme.custom.setSpace('md')}px 0`,
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setGrid(3, 1, theme.custom.setSpace('sm'))
      }
    },
    helpCase0: {
      gridColumn: '1 / 2',
      gridRow: 1,
      [theme.breakpoints.up('sm')]: {
        gridColumn: '1 / 2'
      }
    },
    helpCase1: {
      gridColumn: '1 / 2',
      gridRow: 2,
      [theme.breakpoints.up('sm')]: {
        gridColumn: '2 / 3',
        gridRow: 1
      }
    },
    helpCase2: {
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
      top: -1,
      [theme.breakpoints.only('sm')]: {
        background: 'unset'
      },
      [theme.breakpoints.only('xs')]: {
        width: 'calc(100vw - 60px)'
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
    helpCaseCopy: {
      textAlign: 'center',
      padding: `0 ${theme.custom.setSpace('sm')}px ${theme.custom.setSpace(
        'sm'
      )}px ${theme.custom.setSpace('sm')}px`,
      [theme.breakpoints.only('sm')]: {
        padding: `0 0 ${theme.custom.setSpace('sm')}px 0`
      }
    },
    hideOnSm: {
      [theme.breakpoints.only('sm')]: {
        display: 'none'
      }
    }
  }),
  {
    name: 'Home'
  }
)

export const Home: React.FC = (): JSX.Element | null => {
  const classes = useStyles()

  const content = useSelector(state => state.content.home)

  const iconMap = {
    marketing: <InsertChartIcon className={classes.helpCaseIcon} />,
    development: <MemoryIcon className={classes.helpCaseIcon} />,
    design: <OpacityIcon className={classes.helpCaseIcon} />
  }

  if (!content) return null

  return (
    <Grid container justify="center">
      <ContentContainer bgColor="theme.palette.primary.main">
        <Typography
          variant="h2"
          className={classes.headerTitle}
          dangerouslySetInnerHTML={setHtml(content[0])}
        />
        <Grid className={classes.headerStroke} />
        <Grid className={classes.subtitleContainer}>
          <Typography
            variant="h3"
            className={classes.subtitleHeading}
            dangerouslySetInnerHTML={setHtml(content[1])}
          />
          <img
            src={NcaLogoWhite}
            alt={content[2]}
            className={classes.subtitleLogo}
          />
        </Grid>
      </ContentContainer>
      <AngleBand fill="theme.palette.primary.main" right down />
      <HeroBar src={NcaHome} tagline={content[3]} alt={content[4]} />
      <AngleBand />
      <ContentContainer gradient="theme.custom.setLinearGradient(180, theme.palette.grey[200], 'white')">
        <Grid container>
          <Grid item xs={12} md={8} className={classes.intro}>
            <OpenInBrowserIcon color="primary" className={classes.introIcon} />
            <Grid className={classes.introInner}>
              <Typography variant="h4" className={classes.introTitle}>
                {content[5]}
              </Typography>
              <Typography variant="body1" className={classes.introText}>
                {content[6]}
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
            {content[7]}
          </Typography>
        </Grid>
        <Grid className={classes.helpCasesGrid}>
          {content[8].map((item, itemIndex) => {
            const Icon: JSX.Element = iconMap[item.heading]
            return (
              <Grid
                key={item.key}
                className={clsx(
                  classes.helpCaseBg,
                  `classes.helpCase${itemIndex}`
                )}>
                <ResponsiveAngle right customClass={classes.hideOnSm} />
                {Icon}
                <Typography variant="h4" className={classes.helpCaseTitle}>
                  {item.heading}
                </Typography>
                <Typography variant="body1" className={classes.helpCaseCopy}>
                  {item.copy}
                </Typography>
              </Grid>
            )
          })}
        </Grid>
      </ContentContainer>
    </Grid>
  )
}
