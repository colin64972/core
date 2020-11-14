import { processSheet } from '@cjo3/shared/logic/dlc'
import { sheetData as sheetDataMock } from '@cjo3/shared/react/mocks/dlc'
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

  const values = {
    rangeStart: 'B17',
    rangeEnd: 'AM47',
    ulTrigger: '<',
    ulTriggerZero: 'Rock',
    ulTransform: 'halve',
    olTrigger: '>',
    olTransform: 'halve'
  }

  const result = processSheet(sheetDataMock, values)

  console.log('%c result', 'color: yellow; font-size: large', result.ol)

  const dataUrl = result.ol.dataUrls['>84.000'].transformWhite

  if (!dataUrl) return null

  const style = {
    width: dataUrl.width,
    height: dataUrl.height,
    boxSizing: 'content-box',
    border: '1px solid red',
    borderRadius: 4,
    backgroundImage: `url(${dataUrl.url})`,
    backgroundPosition: 'center',
    backgroundSize: 'initial',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <Grid container>
      <Grid item className={classes.padding}>
        <Typography variant="body1" align="center"></Typography>
        <div style={style} />
      </Grid>
    </Grid>
  )
}
