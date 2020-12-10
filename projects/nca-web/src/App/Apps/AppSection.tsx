import { ImageHandler } from '@cjo3/shared/react/components/ImageHandler'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode'
import GitHubIcon from '@material-ui/icons/GitHub'
import MoneyOffIcon from '@material-ui/icons/MoneyOff'
import MultilineChartIcon from '@material-ui/icons/MultilineChart'
import TouchAppIcon from '@material-ui/icons/TouchApp'
import clsx from 'clsx'
import React from 'react'
import { AppItem, ImageAsset } from '../../../index'
import { MockupDle, MockupKm, MockupNca, MockupNt } from '../assets'
import { ContentContainer } from '../ContentContainer'
import { setHtml } from '@cjo3/shared/react/helpers'

const useStyles = makeStyles(
  theme => ({
    sectionTitle: {
      ...theme.custom.setFlex('row'),
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setFlex('row', 'flex-start')
      }
    },
    sectionTitleIcon: {
      fontSize: theme.typography.fontSize * 4,
      color: theme.palette.primary.main
    },
    seciontTitleText: {
      ...theme.typography.shareTechMono,
      fontSize: theme.custom.setSpace('sm'),
      margin: `0 0 0 ${theme.custom.setSpace()}px`,
      color: theme.palette.primary.main,
      [theme.breakpoints.up('sm')]: {}
    },
    appDescription: {
      textAlign: 'center',
      margin: `${theme.custom.setSpace()}px 0 0 0`,
      [theme.breakpoints.up('sm')]: {
        textAlign: 'unset',
        margin: `${theme.custom.setSpace()}px ${theme.custom.setSpace(
          'sm'
        )}px 0 0`
      }
    },
    actionButtonContainer: {
      ...theme.custom.setFlex(),
      marginTop: theme.custom.setSpace(),
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setFlex('row', 'flex-start')
      }
    },
    actionButton: {
      ...theme.custom.setFlex(),
      ...theme.typography.shareTechMono,
      'textTransform': 'uppercase',
      'margin': `0 ${theme.custom.setSpace()}px 0 0`,
      'cursor': 'pointer',
      'padding': `${
        theme.custom.setSpace() / 2
      }px ${theme.custom.setSpace()}px`,
      'transition': 'all 250ms ease-out',
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.grey[200]
      },
      '&:last-child': {
        margin: 0
      }
    },
    actionButtonIcon: {
      color: theme.palette.primary.main,
      fontSize: theme.typography.fontSize * 2
    },
    techStackContainer: {
      ...theme.custom.setFlex('column'),
      marginTop: theme.custom.setSpace('sm'),
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setFlex('column', 'flex-start', 'flex-end')
      }
    },
    techStack: {
      width: 200,
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      textAlign: 'center',
      padding: theme.custom.setSpace('sm'),
      paddingBottom: theme.custom.setSpace('sm') + 10,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 18px))'
    },
    techStackTitle: {
      ...theme.typography.shareTechMono,
      fontSize: 20,
      textTransform: 'uppercase'
    },
    techStackList: {
      marginTop: theme.custom.setSpace(),
      ...theme.custom.cleanList
    },
    imageContainer: {
      ...theme.custom.setFlex('row', 'flex-start'),
      marginTop: theme.custom.setSpace('sm'),
      overflow: 'hidden',
      [theme.breakpoints.up('sm')]: {
        ...theme.custom.setFlex()
      }
    }
  }),
  {
    name: 'AppSection'
  }
)

export const AppSection: React.FC<AppItem> = ({
  assetIconCode,
  description,
  githubUrl,
  liveUrl,
  stackList,
  title
}): JSX.Element => {
  const classes = useStyles()

  const icons: { [key: string]: JSX.Element } = {
    nca: <ChromeReaderModeIcon className={classes.sectionTitleIcon} />,
    dle: <BorderColorIcon className={classes.sectionTitleIcon} />,
    km: <MultilineChartIcon className={classes.sectionTitleIcon} />,
    nt: <MoneyOffIcon className={classes.sectionTitleIcon} />
  }

  const Icon: JSX.Element = icons[assetIconCode]

  const images: { [key: string]: ImageAsset } = {
    nca: MockupNca,
    dle: MockupDle,
    km: MockupKm,
    nt: MockupNt
  }

  return (
    <ContentContainer gradient="theme.custom.setLinearGradient(180, theme.palette.grey[200], 'white')">
      <Grid container>
        <Grid item xs={12} sm={8} md={9}>
          <Grid className={classes.sectionTitle}>
            {Icon}
            <Typography
              component="h2"
              className={classes.seciontTitleText}
              dangerouslySetInnerHTML={setHtml(title)}
            />
          </Grid>
          <Typography variant="body1" className={classes.appDescription}>
            {description}
          </Typography>
          <Grid className={classes.actionButtonContainer}>
            <a href={liveUrl} target="blank" className={classes.actionButton}>
              <TouchAppIcon className={classes.actionButtonIcon} />
              &ensp;Try
            </a>
            <a href={githubUrl} target="blank" className={classes.actionButton}>
              <GitHubIcon className={classes.actionButtonIcon} />
              &ensp;View Repo
            </a>
          </Grid>
          <Grid className={classes.imageContainer}>
            <ImageHandler asset={images[assetIconCode]} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={3} className={classes.techStackContainer}>
          <Grid className={clsx(classes.techStack)}>
            <Typography variant="h6" className={classes.techStackTitle}>
              Tech Stack
            </Typography>
            <ul className={classes.techStackList}>
              {stackList.map(item => (
                <li key={item.replace(/\s+/gi, '')}>{item}</li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </ContentContainer>
  )
}
