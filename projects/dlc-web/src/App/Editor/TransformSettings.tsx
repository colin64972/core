import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'
import { useSelector } from 'react-redux'
import { sheetDataSelector } from '../../store/selectors'

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.custom.setSpace('sm')
  },
  noTopPadding: {
    paddingTop: 0
  },
  paper: {
    padding: theme.custom.setSpace()
  },
  Editor_TransformSettings_paperGrid: {
    ...theme.custom.setGrid(3, 1, theme.custom.setSpace('sm')),
    marginTop: theme.custom.setSpace(),
    [theme.breakpoints.down('xs')]: {
      ...theme.custom.setGrid(3, 3, theme.custom.setSpace())
    }
  },
  Editor_TransformSettings_paperGrid_position0: {
    gridColumn: '1 / 2',
    gridRow: 1,
    border: `1px solid ${theme.palette.grey[400]}`,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4'
    }
  },
  Editor_TransformSettings_paperGrid_position1: {
    gridColumn: '2 / 3',
    gridRow: 1,
    border: `1px solid ${theme.palette.grey[400]}`,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4',
      gridRow: 2
    }
  },
  Editor_TransformSettings_paperGrid_position2: {
    gridColumn: '3 / 4',
    gridRow: 1,
    border: `1px solid ${theme.palette.grey[400]}`,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 4',
      gridRow: 3
    }
  }
}))

export const TransformSettings: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const sheetData = useSelector(sheetDataSelector)

  if (!sheetData) return null

  return (
    <Grid item xs={12} className={classes.section}>
      <Typography variant="h3" align="center">
        Transform Settings
      </Typography>
      <form className={classes.Editor_TransformSettings_paperGrid}>
        <Paper
          className={clsx(
            classes.Editor_TransformSettings_paperGrid_position0,
            classes.paper
          )}
          elevation={0}>
          <Typography variant="h5" align="center">
            Scope Range
          </Typography>
        </Paper>
        <Paper
          className={clsx(
            classes.Editor_TransformSettings_paperGrid_position1,
            classes.paper
          )}
          elevation={0}>
          <Typography variant="h5" align="center">
            Under Limit
          </Typography>
        </Paper>
        <Paper
          className={clsx(
            classes.Editor_TransformSettings_paperGrid_position2,
            classes.paper
          )}
          elevation={0}>
          <Typography variant="h5" align="center">
            Over Limit
          </Typography>
        </Paper>
      </form>
    </Grid>
  )
}
