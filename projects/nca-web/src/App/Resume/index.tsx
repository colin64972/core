import NcaResume from '@cjo3/shared/assets/svgs/nca-resume'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import SchoolIcon from '@material-ui/icons/School'
import clsx from 'clsx'
import React from 'react'
import { AngleBand } from '../AngleBand'
import {
  LogoAi,
  LogoApollo,
  LogoBir,
  LogoCodecore,
  LogoDappu,
  LogoEuroptimum,
  LogoHaru,
  LogoJumpfactor,
  LogoJuno,
  LogoSauder
} from '../assets'
import { personalDetails, schoolEntries, workEntries } from '../content'
import { HeroBar } from '../HeroBar'
import { ResumeEntry } from './ResumeEntry'

const useStyles = makeStyles(theme => ({
  resumeIcon: {
    fontSize: theme.typography.fontSize * 4
  },
  resumeTitle: {
    ...theme.typography.shareTechMono,
    margin: `0 0 0 ${theme.custom.setSpace()}px`,
    fontSize: theme.typography.fontSize * 2
  },
  white: {
    color: 'white'
  },
  red: {
    color: theme.palette.primary.main
  },
  workEntries: {
    maxWidth: 500,
    marginTop: theme.custom.setSpace('sm')
  },
  schoolEntries: {
    marginTop: theme.custom.setSpace('sm')
  },
  resumeMain: {
    width: '100%',
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.grey[200],
      'white'
    ),
    [theme.breakpoints.up('sm')]: {
      ...theme.custom.setFlex('row', 'center', 'flex-start')
    }
  },
  workSide: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      ...theme.custom.setFlex('column', 'flex-start', 'flex-end')
    }
  },
  workInner: {
    width: '100%',
    padding: theme.custom.setSpace('sm'),
    [theme.breakpoints.up('sm')]: {
      maxWidth: 512
    }
  },
  splitSide: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      marginTop: theme.custom.setSpace('md')
    }
  },
  redBg: {
    backgroundColor: theme.palette.primary.main
  },
  education: {
    padding: theme.custom.setSpace('sm'),
    margin: '-1px 0'
  },
  personalDetails: {
    maxWidth: 512,
    padding: theme.custom.setSpace('sm')
  },
  personalDetailsList: {
    padding: theme.custom.setSpace()
  },
  angle: {
    width: theme.custom.setSpace('sm') * 10,
    height: theme.custom.setSpace('sm'),
    backgroundColor: theme.palette.primary.main
  },
  angleFill: {
    flexGrow: 1,
    height: theme.custom.setSpace('sm'),
    [theme.breakpoints.up('sm')]: {
      marginLeft: -1
    },
    [theme.breakpoints.down(300)]: {
      display: 'none'
    }
  },
  topAngle: {
    clipPath: 'polygon(0 100%, 100% 0, 100% 100%)'
  },
  bottomAngle: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
  }
}))

const logoMap = {
  haru: LogoHaru,
  bir: LogoBir,
  apollo: LogoApollo,
  jumpfactor: LogoJumpfactor,
  europtimum: LogoEuroptimum,
  juno: LogoJuno,
  codecore: LogoCodecore,
  dappu: LogoDappu,
  sauder: LogoSauder,
  ai: LogoAi
}

export const Resume: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container justify="center">
      <HeroBar
        src={NcaResume}
        tagline="The 411 Lowdown of my Resume"
        alt="resume-image"
      />
      <AngleBand top left bgColor="theme.palette.grey[200]" />
      <Grid className={classes.resumeMain}>
        <Grid className={classes.workSide}>
          <Grid className={classes.workInner}>
            <Grid container justify="flex-start" alignItems="center">
              <BusinessCenterIcon className={classes.resumeIcon} />
              <Typography component="h2" className={classes.resumeTitle}>
                work
                <br />
                history
              </Typography>
            </Grid>
            <Grid className={classes.workEntries}>
              {workEntries.map(entry => (
                <ResumeEntry
                  key={entry.key}
                  work
                  logo={logoMap[entry.logo]}
                  title={entry.title}
                  subtitle={entry.subtitle}
                  period={entry.period}
                  bullets={entry.bullets}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.splitSide}>
          <Grid container justify="flex-start" alignItems="flex-end">
            <Grid item className={clsx(classes.angle, classes.topAngle)} />
            <Grid item className={clsx(classes.angleFill, classes.redBg)} />
          </Grid>
          <Grid className={clsx(classes.education, classes.redBg)}>
            <Grid container justify="flex-start" alignItems="center">
              <SchoolIcon className={clsx(classes.resumeIcon, classes.white)} />
              <Typography
                component="h2"
                className={clsx(classes.resumeTitle, classes.white)}>
                completed
                <br />
                education
              </Typography>
            </Grid>
            <Grid className={classes.schoolEntries}>
              {schoolEntries.map(entry => (
                <ResumeEntry
                  key={entry.key}
                  logo={logoMap[entry.logo]}
                  title={entry.title}
                  subtitle={entry.subtitle}
                  period={entry.period}
                  bullets={entry.bullets}
                />
              ))}
            </Grid>
          </Grid>
          <Grid container justify="flex-start" alignItems="flex-start">
            <Grid item className={clsx(classes.angle, classes.bottomAngle)} />
            <Grid item className={clsx(classes.angleFill, classes.redBg)} />
          </Grid>

          <Grid className={classes.personalDetails}>
            <Grid container justify="flex-start" alignItems="center">
              <AssignmentIndIcon
                className={clsx(classes.resumeIcon, classes.red)}
              />
              <Typography
                component="h2"
                className={clsx(classes.resumeTitle, classes.red)}>
                other
                <br />
                details
              </Typography>
            </Grid>
            <Grid>
              <ul className={classes.personalDetailsList}>
                {personalDetails.map(item => (
                  <li key={item.key}>{item.label}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
