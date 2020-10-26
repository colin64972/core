import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import DoneIcon from '@material-ui/icons/Done'
import { makeStyles } from '@material-ui/core/styles'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'
import { defaultPadding } from '@cjo3/shared/react/theming'
import { matchTypes } from './fields'
import { types } from '../../store/types'

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
    mainHeading: {
      ...theme.typography.mainHeading,
      textAlign: 'center'
    },
    subHeading: {
      ...theme.typography.subHeading,
      textAlign: 'center'
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
    matchTypeButtonGridItem: {
      'margin': `${theme.custom.setSpace()}px ${theme.custom.setSpace()}px 0 0`,
      '&:last-child': {
        margin: `${theme.custom.setSpace()}px 0 0 0`
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
    },
    matchTypeButtonsContainer: {
      height: '100%'
    }
  }
})

export const TrialResultsMatchTypes = () => {
  const classes = useStyles()

  const selectedMatchType = useSelector(state => state.app.matchType)

  const dispatch = useDispatch()

  const matchTypeHandler = event =>
    dispatch({
      type: types.CHANGE_MATCHTYPE,
      matchType: event.currentTarget.dataset.matchtype
    })

  return (
    <Grid item xs={12} sm={6}>
      <Grid container className={classes.matchTypeSelection}>
        <Grid item xs={12} className={classes.matchTypeSelectionHeading}>
          <FadeIn direction="y" position={-100}>
            <Typography component="h4" className={classes.subHeading}>
              Google Adwords
            </Typography>
          </FadeIn>
          <FadeIn direction="x" position={-100}>
            <Typography component="h3" className={classes.mainHeading}>
              Add a Match Type
            </Typography>
          </FadeIn>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center">
            {matchTypes.map(buttonItem => (
              <Grid
                item
                className={classes.matchTypeButtonGridItem}
                key={buttonItem.key}>
                <FadeIn key={buttonItem.key} direction="y" position={100}>
                  <button
                    className={classes.matchTypeButton}
                    data-matchtype={buttonItem.value}
                    onClick={matchTypeHandler}>
                    {buttonItem.label}
                    {buttonItem.value === selectedMatchType ? (
                      <DoneIcon className={classes.doneIcon} />
                    ) : (
                      <CloseIcon className={classes.closeIcon} />
                    )}
                  </button>
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
