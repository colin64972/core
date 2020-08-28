import classnames from 'classnames'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep'
import DoneIcon from '@material-ui/icons/Done'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { withStyles, makeStyles } from '@material-ui/styles'
import FadeIn from '@colin30/web-shared/react/components/FadeIn'
import { defaultPadding } from '@colin30/web-shared/react/theming'
import fields from './fields'
import constants from '../constants'
import types from '../../store/types'
import {
  getTrials,
  getMatchType,
  getCopySettings,
  getDomainMode
} from '../../store/selectors'

const CustomSwitch = withStyles(theme => ({
  switchBase: {
    'color': theme.palette.primary[50],
    '&$checked': {
      color: 'white'
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.primary[100]
    }
  },
  checked: {},
  track: {}
}))(Switch)

const useStyles = makeStyles(theme => {
  const button = {
    'border': 'none',
    'margin': `${theme.custom.setSpace()}px ${theme.custom.setSpace()}px 0 0`,
    'padding': theme.custom.setSpace() / 2,
    'fontSize': theme.custom.setSpace(),
    'borderRadius': theme.custom.borderRadius,
    'cursor': 'pointer',
    'color': theme.palette.bodyColor,
    'transition': 'all 250ms ease-out',
    ...theme.custom.setFlex(),
    '&:focus': {
      outline: 'none'
    }
  }
  const matchTypeIcon = {
    marginTop: theme.custom.setSpace(),
    fontSize: theme.custom.setSpace('sm')
  }
  const matchTypeButton = {
    'padding': theme.custom.setSpace(),
    'border': 'none',
    'borderRadius': theme.custom.borderRadius,
    'backgroundColor': theme.palette.primary.main,
    'cursor': 'pointer',
    'color': 'white',
    'fontFamily': theme.typography.fontFamily,
    'fontSize': theme.typography.fontSize,
    'transition': 'background 250ms ease-out, opacity 250ms ease-out',
    ...theme.custom.setFlex('column'),
    '&:focus': {
      outline: 'none'
    }
  }
  return {
    mainHeading: theme.typography.mainHeading,
    matchTypeSection: {
      backgroundColor: theme.palette.primary.main
    },
    manageTrials: {
      ...defaultPadding(theme.breakpoints, theme.custom.setSpace)
    },
    matchTypeSelection: {
      height: '100%',
      color: 'white',
      backgroundColor: theme.palette.primary[400],
      ...defaultPadding(theme.breakpoints, theme.custom.setSpace)
    },
    matchTypeSelectionHeading: {
      ...theme.custom.setFlex('column nowrap', 'flex-end')
    },
    matchTypeButtonFadeIn: {
      margin: `${theme.custom.setSpace()}px ${theme.custom.setSpace()}px 0 0`
    },
    switchGroupLabel: {
      marginRight: 0
    },
    matchTypeButton: {
      ...matchTypeButton,
      '&:hover': {
        backgroundColor: theme.palette.primary[600]
      }
    },
    matchTypeButtonDisabled: {
      ...matchTypeButton,
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      },
      'cursor': 'initial'
    },
    doneIcon: {
      ...matchTypeIcon,
      color: theme.palette.pass[500]
    },
    closeIcon: {
      ...matchTypeIcon,
      color: theme.palette.fail[500]
    },
    icon: {
      fontSize: theme.custom.setSpace() * 1.5,
      marginRight: theme.custom.setSpace() / 4
    },
    toggleText: {
      fontSize: theme.custom.setSpace() * 1.25,
      color: theme.palette.bodyColor
    },
    copyAllButton: {
      ...button,
      'backgroundColor': theme.palette.primary[200],
      '&:hover': {
        backgroundColor: theme.palette.pass[500]
      }
    },
    deleteAllButton: {
      ...button,
      'backgroundColor': theme.palette.primary[200],
      '&:hover': {
        backgroundColor: theme.palette.fail[500]
      }
    },
    disabledButton: {
      ...button,
      color: theme.palette.primary[700],
      backgroundColor: theme.palette.primary[400],
      cursor: 'unset'
    }
  }
})

const MatchTypes = ({ ...props }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const trials = useSelector(state => getTrials(state))
  const selectedMatchType = useSelector(state => getMatchType(state))
  const copySettings = useSelector(state => getCopySettings(state))
  const domainMode = useSelector(state => getDomainMode(state))

  const { items, shown } = trials
  const { dataOnly } = copySettings

  const buttonsDisabled = shown.length < 2

  const matchTypeHandler = event =>
    dispatch({
      type: types.CHANGE_MATCHTYPE,
      matchType: event.currentTarget.dataset.matchtype
    })

  const copyAllHandler = event => dispatch({ type: types.COPY_ALL_TRIALS })

  const askDeleteTrials = event =>
    dispatch({ type: types.ASK_DELETE_ALL_TRIALS })

  const dataOnlyHandler = event =>
    dispatch({
      type: types.TOGGLE_COPY_DATA_ONLY
    })

  const domainModeHandler = event =>
    dispatch({
      type: types.TOGGLE_DOMAIN_MODE
    })

  if (items.length < 1) return null
  return (
    <Grid item xs={12} component="section" className={classes.matchTypeSection}>
      <Grid container>
        <Grid item xs={12} sm={6} className={classes.manageTrials}>
          <Grid container direction="column">
            <FadeIn
              direction="y"
              position={-100}
              component={<Typography variant="subtitle2">Settings</Typography>}
            />
            <FadeIn
              direction="x"
              position={-100}
              component={
                <Typography variant="h4" className={classes.mainHeading}>
                  Manage your Trials
                </Typography>
              }
            />
            <FadeIn
              direction="y"
              position={100}
              component={
                <Typography variant="body1">
                  Est voluptua stet ea sadipscing nonumy gubergren eos, nonumy
                  dolore dolore sadipscing est consetetur diam sed.
                </Typography>
              }
            />
            <FadeIn
              direction="x"
              position={-100}
              component={
                <FormGroup row>
                  <FormControlLabel
                    className={classes.switchGroupLabel}
                    control={
                      <CustomSwitch
                        name="copyDataOnly"
                        color="primary"
                        checked={dataOnly}
                        onChange={dataOnlyHandler}
                      />
                    }
                    label={
                      <Typography
                        variant="body1"
                        className={classes.toggleText}>
                        Copy data only
                      </Typography>
                    }
                  />
                </FormGroup>
              }
            />
            <FadeIn
              direction="x"
              position={100}
              component={
                <FormGroup row>
                  <FormControlLabel
                    className={classes.switchGroupLabel}
                    control={
                      <CustomSwitch
                        name="domainMode"
                        color="primary"
                        checked={domainMode}
                        onChange={domainModeHandler}
                      />
                    }
                    label={
                      <Typography
                        variant="body1"
                        className={classes.toggleText}>
                        Domain mode
                      </Typography>
                    }
                  />
                </FormGroup>
              }
            />
            <Grid container justify="flex-start" alignItems="center">
              <FadeIn
                direction="x"
                position={-100}
                component={
                  <button
                    type="button"
                    onClick={copyAllHandler}
                    disabled={buttonsDisabled}
                    className={
                      buttonsDisabled
                        ? classes.disabledButton
                        : classes.copyAllButton
                    }>
                    <FileCopyIcon className={classes.icon} />
                    Copy All
                  </button>
                }
              />
              <FadeIn
                direction="x"
                position={100}
                component={
                  <button
                    type="button"
                    onClick={askDeleteTrials}
                    disabled={buttonsDisabled}
                    className={
                      buttonsDisabled
                        ? classes.disabledButton
                        : classes.deleteAllButton
                    }>
                    <DeleteSweepIcon className={classes.icon} />
                    Delete All
                  </button>
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container className={classes.matchTypeSelection}>
            <Grid item xs={12} className={classes.matchTypeSelectionHeading}>
              <FadeIn
                direction="y"
                position={-100}
                component={
                  <Typography variant="subtitle2">Google Adwords</Typography>
                }
              />
              <FadeIn
                direction="x"
                position={-100}
                component={
                  <Typography variant="h4" className={classes.mainHeading}>
                    Add a Match Type
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" alignItems="center">
                {fields.matchTypes.map(matchType => (
                  <Grid item key={matchType.key}>
                    <FadeIn
                      key={matchType.key}
                      direction="y"
                      position={100}
                      className={classes.matchTypeButtonFadeIn}
                      component={
                        <button
                          className={classnames(classes.matchTypeButton, {
                            [classes.matchTypeButtonDisabled]: domainMode
                          })}
                          data-matchtype={matchType.value}
                          onClick={matchTypeHandler}
                          disabled={domainMode}>
                          {matchType.label}
                          {matchType.value === selectedMatchType ? (
                            <DoneIcon className={classes.doneIcon} />
                          ) : (
                            <CloseIcon className={classes.closeIcon} />
                          )}
                        </button>
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MatchTypes
