import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { ImageHandler } from '@cjo3/shared/react/components/ImageHandler'
import DoneIcon from '@material-ui/icons/Done'
import ScheduleIcon from '@material-ui/icons/Schedule'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import { switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import React from 'react'
import {
  HomeHeader,
  HomeEnvironment,
  HomeStarBg,
  HomeGeochemistry,
  HomeOilGas,
  HomeFoodSafety,
  HomePaperPulp,
  HomePharmaceutical,
  HomeSpreadsheetBg
} from '../assets'
import { Header } from './Header'

const useStyles = makeStyles(
  theme => ({
    Home_contentContainer: {
      ...theme.custom.contentContainer
    },

    Home_body1Text: {
      color: theme.palette.bodyColor,
      maxWidth: '67%'
    },

    Home_introContainerBg: {
      background: theme.custom.setLinearGradient(
        180,
        theme.palette.grey[300],
        'white'
      )
    },
    Home_introContent: {
      padding: `${theme.custom.setSpace('md')}px ${theme.custom.setSpace(
        'sm'
      )}px`
    },
    Home_introImage: {
      marginBottom: theme.custom.setSpace('sm')
    },

    Home_fbContainer: {
      padding: `${theme.custom.setSpace('md')}px 0`
    },
    Home_fbLeftBg: {
      ...theme.custom.setFlex('row', 'flex-end'),
      background: theme.custom.setLinearGradient(
        180,
        theme.palette.grey[300],
        'white'
      )
    },
    Home_fbPanel: {
      width: 512,
      padding: theme.custom.setSpace('sm'),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    Home_fbLeftHeading: {
      textAlign: 'right',
      width: '100%',
      marginBottom: theme.custom.setSpace('sm'),
      [theme.breakpoints.down('xs')]: {
        textAlign: 'center'
      }
    },
    Home_fbLeftCopy: {
      textAlign: 'right',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'left'
      }
    },
    Home_fbBenefit: {
      'width': `calc(50% - ${theme.custom.setSpace()}px)`,
      'marginLeft': theme.custom.setSpace('sm'),
      '&:first-child': {
        marginLeft: 0
      }
    },
    Home_fbBenefitIcon: {
      fontSize: theme.typography.fontSize * 3,
      marginBottom: theme.custom.setSpace()
    },
    Home_fbBenefitEfficiency: {
      color: theme.palette.primary.main
    },
    Home_fbBenefitAccuracy: {
      color: theme.palette.secondary.main
    },
    Home_bodyColorText: {
      color: theme.palette.bodyColor
    },
    Home_fbRightHeading: {
      marginBottom: theme.custom.setSpace('sm')
    },

    Home_fbList: {
      ...theme.custom.cleanList,
      maxWidth: 512,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        paddingLeft: theme.custom.setSpace()
      }
    },
    Home_fbListItem: {
      ...theme.custom.setFlex('row', 'flex-start'),
      'marginBottom': theme.custom.setSpace() / 2,
      'transition': 'all 250ms ease-out',
      '&:last-child': {
        marginBottom: 0
      }
    },
    Home_fbListItemIcon: {
      fontSize: theme.typography.fontSize * 2,
      marginRight: theme.custom.setSpace(),
      color: theme.palette.pass[500]
    },

    Home_midCtaContainer: {
      padding: `${theme.custom.setSpace('md')}px ${theme.custom.setSpace(
        'sm'
      )}px`,
      backgroundImage: `url(${HomeSpreadsheetBg.paths[0]})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    Home_midCta: {
      'width': theme.custom.setSpace('xl') * 2,
      'padding': theme.custom.setSpace('sm'),
      'borderRadius': theme.custom.setSpace('xl'),
      'background': theme.custom.setLinearGradient(
        180,
        theme.palette.secondary.main,
        theme.palette.secondary[500]
      ),
      'boxShadow': theme.custom.boxShadow,
      'color': 'white',
      'transition': 'all 250ms ease-out',
      '&:hover': {
        color: theme.palette.secondary[50],
        cursor: 'pointer'
      }
    },

    Home_useCaseContent: {
      padding: `${theme.custom.setSpace('md')}px ${theme.custom.setSpace(
        'sm'
      )}px`
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
  }),
  {
    name: 'Home'
  }
)

export const Home: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const midCtaClickHandler = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (window) window.location.replace(switchLinkRoutePath('/converter'))
  }

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
            Easily Convert MDL Text to Actionable Number Values
          </Typography>
          <Typography
            variant="body1"
            align="center"
            className={classes.Home_body1Text}>
            Depending on the lab you work with and their data output
            capabilities, importing results into your workflow can be error
            prone and time consuming. If you&apos;ve ever had to manually comb
            through sheets of data looking for and changing detection level text
            values to number values, you&apos;ve found yourself in the right
            place!
          </Typography>
          <Typography
            variant="body1"
            align="center"
            className={classes.Home_body1Text}>
            Specifically, {process.env.APP_NAME} allows you to bypass the
            tedious operation of &quot;Finding &amp; Replacing&quot; each cell
            of text data in a traditional spreadsheet program like Microsoft
            Excel. As a browser&ndash;based tool,&nbsp;
            {process.env.APP_NAME} is a suited for independent consultants or
            other users who need to prepare large amounts of raw, analytical
            data, but do not have access to expensive, proprietary software that
            may have these features built-in.
          </Typography>
          <Typography
            variant="body1"
            align="center"
            className={classes.Home_body1Text}>
            With {process.env.APP_NAME}, you can quickly replace limiting
            threshold characters in just a few clicks by selecting parameters
            and processing your sheet. After processing, the transformed sheet
            can be reviewed prior to downloading as a convenient Microsoft Excel
            workbook, and is available for the low price of $
            {process.env.EXPORT_PRICE}.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        component="section"
        justify="center"
        alignItems="flex-start"
        className={classes.Home_fbContainer}>
        <Grid item xs={12} sm={6} className={classes.Home_fbLeftBg}>
          <Grid container className={classes.Home_fbPanel}>
            <Typography variant="h3" className={classes.Home_fbLeftHeading}>
              Why Use This Tool?
            </Typography>
            <Grid container justify="flex-end">
              <Grid
                container
                direction="column"
                alignItems="center"
                className={clsx(
                  classes.Home_fbBenefit,
                  classes.Home_fbBenefitEfficiency
                )}>
                <ScheduleIcon className={classes.Home_fbBenefitIcon} />
                <Typography variant="h5" align="center">
                  Efficiency
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.Home_bodyColorText}>
                  Save time and mental capacity by eliminating monotonous data
                  preparation woes. You&apos;re time is better spent analysing
                  executive results, not repetitive data&ndash;entry.
                </Typography>
              </Grid>
              <Grid
                container
                direction="column"
                alignItems="center"
                className={clsx(
                  classes.Home_fbBenefit,
                  classes.Home_fbBenefitAccuracy
                )}>
                <AssignmentTurnedInIcon
                  className={classes.Home_fbBenefitIcon}
                />
                <Typography variant="h5" align="center">
                  Accuracy
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.Home_bodyColorText}>
                  &quot;Find &amp; Replace&quot; is great, but when you have to
                  do it manually across multiple sheets and files, it can be
                  easy to miss cases, or even introduce errors into your
                  dataset!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.Home_fbPanel}>
          <Typography variant="h3" className={classes.Home_fbRightHeading}>
            Special Features
          </Typography>
          <ul className={classes.Home_fbList}>
            <li className={classes.Home_fbListItem}>
              <DoneIcon className={classes.Home_fbListItemIcon} />
              Custom Under and Over Limit triggers
            </li>
            <li className={classes.Home_fbListItem}>
              <DoneIcon className={classes.Home_fbListItemIcon} />
              Preset transform functions
            </li>
            <li className={classes.Home_fbListItem}>
              <DoneIcon className={classes.Home_fbListItemIcon} />
              Unique value-to-zero trigger
            </li>
            <li className={classes.Home_fbListItem}>
              <DoneIcon className={classes.Home_fbListItemIcon} />
              Scope range protection
            </li>
            <li className={classes.Home_fbListItem}>
              <DoneIcon className={classes.Home_fbListItemIcon} />
              Detailed sheet previews
            </li>
            <li className={classes.Home_fbListItem}>
              <DoneIcon className={classes.Home_fbListItemIcon} />
              Export with original data in cell comments
            </li>
          </ul>
        </Grid>
      </Grid>

      <Grid component="section" container justify="center">
        <Grid
          container
          justify="center"
          className={clsx(
            classes.Home_contentContainer,
            classes.Home_midCtaContainer
          )}>
          <Grid
            item
            className={classes.Home_midCta}
            onClick={midCtaClickHandler}>
            <Typography
              variant="h3"
              align="center"
              className={classes.Home_midCtaText}>
              Try It Out!
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid component="section" container justify="center">
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
          <Typography
            variant="body1"
            align="center"
            className={classes.Home_body1Text}>
            Whether your discipline is environmental testing, geochemistry, oil
            &amp; gas, pharmaceutical, pulp &amp; paper, or food safety&mdash;to
            list a few&mdash;{process.env.APP_NAME}&nbsp;is an easy way to
            incorporate raw, analytical results from labs like ALS, SGS, and
            Alex Stewart International into your workflow!
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
