import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { ImageHandler } from '@cjo3/shared/react/components/ImageHandler'
import React from 'react'
import {
  HomeHeader,
  HomeEnvironment,
  HomeStarBg,
  HomeGeochemistry,
  HomeOilGas,
  HomeFoodSafety,
  HomePaperPulp,
  HomePharmaceutical
} from '../../assets'
import { Header } from '../Header'

const useStyles = makeStyles(theme => ({
  Home_contentContainer: {
    ...theme.custom.contentContainer
  },
  Home_introContainerBg: {
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.grey[300],
      'white'
    )
  },
  Home_introContent: {
    padding: `${theme.custom.setSpace('md')}px ${theme.custom.setSpace('sm')}px`
  },
  Home_introImage: {
    marginBottom: theme.custom.setSpace('sm')
  },
  Home_useCaseContainerBg: {
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.grey[400],
      theme.palette.grey[300]
    )
  },
  Home_useCaseContent: {
    padding: `${theme.custom.setSpace('md')}px ${theme.custom.setSpace('sm')}px`
  },
  Home_useCaseContainer: {
    marginTop: theme.custom.setSpace('sm'),
    ...theme.custom.setGrid(3, 'auto', theme.custom.setSpace('sm')),
    width: '100%'
  },
  Home_useCase0: {
    gridColumn: '1 / 2',
    gridRow: 1,
    backgroundImage: `url(${HomeEnvironment.paths[0]})`,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4'
    }
  },
  Home_useCase1: {
    gridColumn: '2 / 3',
    gridRow: 1,
    backgroundImage: `url(${HomeGeochemistry.paths[0]})`,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4',
      gridRow: 2
    }
  },
  Home_useCase2: {
    gridColumn: '3 / 4',
    gridRow: 1,
    backgroundImage: `url(${HomeOilGas.paths[0]})`,
    backgroundPosition: 'top middle',
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4',
      gridRow: 3
    }
  },
  Home_useCase3: {
    gridColumn: '1 / 2',
    gridRow: 2,
    backgroundImage: `url(${HomePharmaceutical.paths[0]})`,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4',
      gridRow: 4
    }
  },
  Home_useCase4: {
    gridColumn: '2 / 3',
    gridRow: 2,
    backgroundImage: `url(${HomePaperPulp.paths[0]})`,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4',
      gridRow: 5
    }
  },
  Home_useCase5: {
    gridColumn: '3 / 4',
    gridRow: 2,
    backgroundImage: `url(${HomeFoodSafety.paths[0]})`,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4',
      gridRow: 6
    }
  },
  Home_useCase: {
    'padding': theme.custom.setSpace('sm'),
    ...theme.custom.setFlex(),
    ...theme.custom.borderRadius,
    'boxShadow': theme.custom.boxShadow,
    'color': theme.palette.grey[50],
    'textShadow': theme.custom.textShadow,
    'backgroundSize': 'cover',
    'backgroundRepeat': 'no-repeat',
    'backgroundBlendMode': 'multiply',
    'backgroundColor': 'rgba(0, 0, 0, 0.5)',
    'transition': 'background-color 250ms ease-out',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.25)'
    }
  }
}))

export const Home: React.FC = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Grid container>
      <Header
        name="Home"
        title={process.env.APP_NAME}
        subTitle="Conversion tool for spreadsheet-based, raw analytical data"
        bgColor="theme.palette.primary.main"
        bgUrl={HomeStarBg.paths[0]}
        buttonHref="/converter"
        buttonLabel="Start"
      />
      <Grid
        component="section"
        container
        justify="center"
        className={classes.Home_introContainerBg}>
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          className={clsx(
            classes.Home_contentContainer,
            classes.Home_introContent
          )}>
          <ImageHandler
            asset={HomeHeader}
            outerClass={classes.Home_introImage}
          />
          <Typography variant="h3" align="center">
            Easily convert MDL text to actionable number values
          </Typography>
          <Typography variant="body1" align="center">
            This app is suited for individuals who import analytical data into
            proprietary software that does not already have such editing
            features built-in. {process.env.APP_NAME} bypasses the tedious
            operation of &quot;Find &amp; Replace&quot; used in Excel and other
            spreadsheet programs. Now, you can replace those limiting threshold
            characters in one step by just selecting your parameters and
            applying them to your entire data range. The revised data can be
            reviewed prior to downloading; export formats are currently just
            Excel &#40;.xls and .xlsx&#41;. first pass and some text for home
            page summary
          </Typography>
        </Grid>
      </Grid>

      <Grid
        component="section"
        container
        justify="center"
        className={classes.Home_useCaseContainerBg}>
        <Grid
          container
          justify="center"
          className={clsx(
            classes.Home_contentContainer,
            classes.Home_useCaseContent
          )}>
          <Typography variant="h3" align="center">
            Applied Science Applications
          </Typography>
          <div className={classes.Home_useCaseContainer}>
            <div className={clsx(classes.Home_useCase0, classes.Home_useCase)}>
              <Typography variant="h5" align="center">
                Environmental Testing
              </Typography>
            </div>
            <div className={clsx(classes.Home_useCase1, classes.Home_useCase)}>
              <Typography variant="h5" align="center">
                Geochemistry
              </Typography>
            </div>
            <div className={clsx(classes.Home_useCase2, classes.Home_useCase)}>
              <Typography variant="h5" align="center">
                Oil &amp; Gas
              </Typography>
            </div>
            <div className={clsx(classes.Home_useCase3, classes.Home_useCase)}>
              <Typography variant="h5" align="center">
                Pharmaceutical
              </Typography>
            </div>
            <div className={clsx(classes.Home_useCase4, classes.Home_useCase)}>
              <Typography variant="h5" align="center">
                Pulp &amp; paper
              </Typography>
            </div>
            <div className={clsx(classes.Home_useCase5, classes.Home_useCase)}>
              <Typography variant="h5" align="center">
                Food Safety
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}
