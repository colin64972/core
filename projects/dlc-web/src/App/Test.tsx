import { transformResult } from '@cjo3/shared/react/mocks/dlc'
import { sortAddresses } from '@cjo3/shared/react/xlsx'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
  padding: {
    padding: theme.custom.setSpace('sm')
  }
}))

export const Test: React.FC = (): JSX.Element => {
  const classes = useStyles()
  let result = []

  const { addresses } = transformResult.ul

  result = sortAddresses(addresses).join(', ')

  return (
    <Grid container>
      <Grid item className={classes.padding}>
        <Typography variant="body1" align="center">
          {result}
        </Typography>
      </Grid>
    </Grid>
  )
}
