import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import DoneIcon from '@material-ui/icons/Done'
import { makeStyles } from '@material-ui/styles'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { defaultPadding } from '@colin30/shared/react/theming'
import { matchTypes } from './fields'
import { types } from '../../store/types'
import { getMatchType } from '../../store/selectors'

const useStyles = makeStyles(theme => {
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
      'marginRight': theme.custom.setSpace(),
      '&:last-child': {
        marginRight: 0
      }
    },
    matchTypeButton: {
      ...matchTypeButton,
      '&:hover': {
        backgroundColor: theme.palette.primary[600]
      }
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
    }
  }
})

export const MatchTypesPanel = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedMatchType = useSelector(state => getMatchType(state))
  const matchTypeHandler = event =>
    dispatch({
      type: types.CHANGE_MATCHTYPE,
      matchType: event.currentTarget.dataset.matchtype
    })

  return (
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
              <Typography
                variant="h4"
                className={classes.mainHeading}
                align="center">
                Add a Match Type
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center">
            {matchTypes.map(matchType => (
              <FadeIn
                key={matchType.key}
                direction="y"
                position={100}
                className={classes.matchTypeButtonFadeIn}
                component={
                  <button
                    className={classes.matchTypeButton}
                    data-matchtype={matchType.value}
                    onClick={matchTypeHandler}>
                    {matchType.label}
                    {matchType.value === selectedMatchType ? (
                      <DoneIcon className={classes.doneIcon} />
                    ) : (
                      <CloseIcon className={classes.closeIcon} />
                    )}
                  </button>
                }
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
