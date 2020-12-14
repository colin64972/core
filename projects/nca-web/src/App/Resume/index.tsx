import NcaResume from '@cjo3/shared/assets/svgs/nca-resume'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import { useSelector } from 'react-redux'
import CodeIcon from '@material-ui/icons/Code'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import SchoolIcon from '@material-ui/icons/School'
import clsx from 'clsx'
import { saveAs } from 'file-saver'
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
import { ContentContainer } from '../ContentContainer'
import { HeroBar } from '../HeroBar'
import { ResumeEntry } from './ResumeEntry'
import { SkillGraph } from './SkillGraph'
import { setHtml } from '@cjo3/shared/react/helpers'
import { skillCategories } from '@cjo3/shared/raw/constants/nca'
import { ResponsiveAngle } from '../ResponsiveAngle'

const useStyles = makeStyles(
  theme => ({
    downloadSection: {
      marginBottom: theme.custom.setSpace('md'),
      width: '100%'
    },
    downloadTitle: {
      ...theme.typography.shareTechMono,
      textAlign: 'center',
      textTransform: 'uppercase',
      marginBottom: theme.custom.setSpace()
    },
    downloadButton: {
      ...theme.typography.shareTechMono
    },
    downloadButtonColor: {
      marginRight: theme.custom.setSpace()
    },
    downloadButtonIcon: {
      marginRight: theme.custom.setSpace()
    },
    sectionTitleIcon: {
      fontSize: theme.typography.fontSize * 4
    },
    seciontTitle: {
      ...theme.typography.shareTechMono,
      fontSize: theme.typography.fontSize * 2,
      margin: 0
    },
    white: {
      color: 'white'
    },
    red: {
      color: theme.palette.primary.main
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
      margin: `0 0 ${theme.custom.setSpace('sm')}px 0`,
      [theme.breakpoints.up('sm')]: {
        maxWidth: 512,
        margin: 0
      }
    },
    workEntries: {
      maxWidth: 500,
      marginTop: theme.custom.setSpace('sm')
    },
    splitSide: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '50%',
        marginTop: theme.custom.setSpace('md')
      }
    },
    angle: {
      marginRight: -1,
      maxWidth: 300
    },
    filler: {
      flexGrow: 1,
      height: theme.custom.setSpace('sm')
    },
    redBg: {
      backgroundColor: theme.palette.primary.main
    },
    education: {
      padding: theme.custom.setSpace('sm'),
      paddingBottom: theme.custom.setSpace('sm') * 1.5
    },
    schoolEntries: {
      marginTop: theme.custom.setSpace('sm')
    },
    personalDetails: {
      maxWidth: 512,
      padding: theme.custom.setSpace('sm')
    },
    personalDetailsList: {
      padding: theme.custom.setSpace()
    },
    skillsContainer: {
      marginTop: theme.custom.setSpace('sm'),
      ...theme.custom.setGrid(1, 'auto', theme.custom.setSpace('md')),
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setGrid(3, 'auto', theme.custom.setSpace('md'))
      }
    },
    skillsSection0: {
      gridColumn: '1 / 2',
      gridRow: 1
    },
    skillsSection1: {
      gridColumn: '1 / 2',
      gridRow: 2,
      [theme.breakpoints.up('sm')]: {
        gridColumn: '2 / 3',
        gridRow: 1
      }
    },
    skillsSection2: {
      gridColumn: '1 / 2',
      gridRow: 3,
      [theme.breakpoints.up('sm')]: {
        gridColumn: '3 / 4',
        gridRow: 1
      }
    },
    skillsSection3: {
      gridColumn: '1 / 2',
      gridRow: 4,
      [theme.breakpoints.up('sm')]: {
        gridRow: 2
      }
    },
    skillsSection4: {
      gridColumn: '1 / 2',
      gridRow: 5,
      [theme.breakpoints.up('sm')]: {
        gridColumn: '2 / 3',
        gridRow: 2
      }
    },
    skillsSection5: {
      gridColumn: '1 / 2',
      gridRow: 6,
      [theme.breakpoints.up('sm')]: {
        gridColumn: '3 / 4',
        gridRow: 2
      }
    },
    skillsSection6: {
      gridColumn: '1 / 2',
      gridRow: 7,
      paddingBottom: theme.custom.setSpace('sm'),
      [theme.breakpoints.up('sm')]: {
        gridRow: 3
      }
    }
  }),
  {
    name: 'Resume'
  }
)

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

export const Resume: React.FC = (): JSX.Element | null => {
  const classes = useStyles()

  const content = useSelector(state => state.content.resume)

  if (!content) return null

  function downloadHandler(event: MouseEvent): void {
    const fileVariant = event.currentTarget.name
    saveAs(
      process.env.BUILD_ENV === 'production'
        ? `${process.env.CDN_URL_PRO}/${process.env.CDN_APP_FOLDER}/${process.env.RESUME_FILENAME}-${fileVariant}.pdf`
        : `${process.env.CDN_URL_STA}/${process.env.CDN_APP_FOLDER}/${process.env.RESUME_FILENAME}-${fileVariant}.pdf`,
      `${process.env.RESUME_FILENAME}.pdf`
    )
  }
  return (
    <Grid container justify="center">
      <HeroBar src={NcaResume} tagline={content[0]} alt={content[1]} />
      <Grid className={classes.downloadSection}>
        <Typography variant="h5" className={classes.downloadTitle}>
          {content[2]}
        </Typography>
        <Grid container justify="center" alignItems="center">
          <Button
            type="button"
            className={clsx(
              classes.downloadButton,
              classes.downloadButtonColor
            )}
            variant="outlined"
            color="primary"
            onClick={downloadHandler}
            name="color">
            <PictureAsPdfIcon className={classes.downloadButtonIcon} />
            {content[3]}
          </Button>
          <Button
            type="button"
            className={classes.downloadButton}
            variant="outlined"
            name="grey"
            onClick={downloadHandler}>
            <PictureAsPdfIcon className={classes.downloadButtonIcon} />
            {content[4]}
          </Button>
        </Grid>
      </Grid>
      <AngleBand />
      <Grid className={classes.resumeMain}>
        <Grid className={classes.workSide}>
          <Grid className={classes.workInner}>
            <BusinessCenterIcon className={classes.sectionTitleIcon} />
            <Typography
              component="h2"
              className={classes.seciontTitle}
              dangerouslySetInnerHTML={setHtml(content[5])}
            />
            <Grid className={classes.workEntries}>
              {content[6].map(entry => (
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
          <Grid container>
            <ResponsiveAngle
              fill="theme.palette.primary.main"
              right
              customClass={classes.angle}
            />
            <Grid className={clsx(classes.filler, classes.redBg)} />
          </Grid>
          <Grid className={clsx(classes.education, classes.redBg)}>
            <SchoolIcon
              className={clsx(classes.sectionTitleIcon, classes.white)}
            />
            <Typography
              component="h2"
              className={clsx(classes.seciontTitle, classes.white)}
              dangerouslySetInnerHTML={setHtml(content[7])}
            />
            <Grid className={classes.schoolEntries}>
              {content[8].map(entry => (
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
          <Grid container>
            <ResponsiveAngle
              fill="theme.palette.primary.main"
              right
              down
              customClass={classes.angle}
            />
            <Grid className={clsx(classes.filler, classes.redBg)} />
          </Grid>
          <Grid className={classes.personalDetails}>
            <AssignmentIndIcon
              className={clsx(classes.sectionTitleIcon, classes.red)}
            />
            <Typography
              component="h2"
              className={clsx(classes.seciontTitle, classes.red)}
              dangerouslySetInnerHTML={setHtml(content[9])}
            />
            <ul className={classes.personalDetailsList}>
              {content[10].map(item => (
                <li key={item.key}>{item.label}</li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Grid>
      <AngleBand right />
      <ContentContainer gradient="theme.custom.setLinearGradient(180, theme.palette.grey[200], 'white')">
        <CodeIcon className={classes.sectionTitleIcon} />
        <Typography
          component="h2"
          className={clsx(classes.seciontTitle, classes.red)}
          dangerouslySetInnerHTML={setHtml(content[11])}
        />
        <Grid className={classes.skillsContainer}>
          {skillCategories.map((category, index) => (
            <Grid
              key={`skill-section-${category}`}
              className={classes[`skillsSection${index}`]}>
              {content[12]
                .filter(skill => skill.category === index)
                .map(skill => (
                  <SkillGraph {...skill} />
                ))}
            </Grid>
          ))}
        </Grid>
      </ContentContainer>
    </Grid>
  )
}
