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
  LogoApollo,
  LogoBir,
  LogoEuroptimum,
  LogoHaru,
  LogoJumpfactor,
  LogoAi,
  LogoCodecore,
  LogoDappu,
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
      ...theme.custom.setFlex('column', 'flex-start', 'flex-start')
    }
  },
  splitTop: {
    width: '100%',
    backgroundColor: theme.palette.primary.main
  },
  educationTopAngle: {
    height: theme.custom.setSpace('sm'),
    border: '1px solid blue',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
      maxWidth: 512
    }
  },
  education: {
    border: '1px solid blue',
    padding: theme.custom.setSpace('sm'),
    [theme.breakpoints.up('sm')]: {
      maxWidth: 512
    }
  },
  splitBottom: {
    width: '100%'
  },
  personalDetails: {
    maxWidth: 512,
    padding: theme.custom.setSpace('sm')
  },
  personalDetailsList: {
    padding: theme.custom.setSpace()
  },
  angleRight: {
    height: theme.custom.setSpace('sm'),
    border: '1px solid green'
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
          <Grid className={classes.splitTop}>
            <Grid className={classes.education}>
              <Grid container justify="flex-start" alignItems="center">
                <SchoolIcon
                  className={clsx(classes.resumeIcon, classes.white)}
                />
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
            <Grid className={classes.angleRight} />
          </Grid>
          <Grid className={classes.splitBottom}>
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
    </Grid>
  )
}
