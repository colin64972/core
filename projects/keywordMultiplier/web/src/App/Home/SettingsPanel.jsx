import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormGroup from '@material-ui/core/FormGroup'
import Typography from '@material-ui/core/Typography'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { withStyles, makeStyles } from '@material-ui/styles'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { defaultPadding } from '@colin30/shared/react/theming'
import { whiteSpaceOptions } from './fields'
import {
  getTrials,
  getCopySettings,
  getWhiteSpaceSelection
} from '../../store/selectors'
import { types } from '../../store/types'

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
  return {
    mainHeading: theme.typography.mainHeading,
    manageTrials: {
      ...defaultPadding(theme.breakpoints, theme.custom.setSpace)
    },
    settingsCopy: {
      marginBottom: theme.custom.setSpace() / 2
    },
    switchGroupLabel: {
      marginRight: 0
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
    },
    whiteSpaceSelector: {
      margin: `${theme.custom.setSpace()}px 0`
    }
  }
})

export const SettingsPanel = () => {
  const classes = useStyles()
  const copySettings = useSelector(state => getCopySettings(state))
  const { dataOnly } = copySettings
  const whiteSpaceSelection = useSelector(state =>
    getWhiteSpaceSelection(state)
  )
  const trials = useSelector(state => getTrials(state))
  const { shown } = trials
  const dispatch = useDispatch()
  const copyAllHandler = () => dispatch({ type: types.COPY_ALL_TRIALS })
  const askDeleteTrials = () => dispatch({ type: types.ASK_DELETE_ALL_TRIALS })
  const dataOnlyHandler = () =>
    dispatch({
      type: types.TOGGLE_COPY_DATA_ONLY
    })
  const whiteSpaceSelectorHandler = event =>
    dispatch({
      type: types.CHANGE_WHITESPACE_SELECTION,
      selection: event.target.value
    })
  const buttonsDisabled = shown.length < 2
  return (
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
            <Typography variant="body1" className={classes.settingsCopy}>
              Est voluptua stet ea sadipscing nonumy gubergren eos, nonumy
              dolore dolore sadipscing est consetetur diam sed.
            </Typography>
          }
        />
        <FadeIn
          direction="x"
          position={100}
          className={classes.whiteSpaceSelector}
          component={
            <FormControl fullWidth>
              <InputLabel>Whitespace Replacement</InputLabel>
              <Select
                value={whiteSpaceSelection}
                onChange={whiteSpaceSelectorHandler}>
                {whiteSpaceOptions.map(option => (
                  <MenuItem key={option.key} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                  <Typography variant="body1" className={classes.toggleText}>
                    Copy Data Only
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
  )
}
