import { Button, ButtonGroup, Grid, Typography } from '@material-ui/core'
import {
  sheetData as sheetDataMock,
  transformResult as transformResultMock
} from '@cjo3/shared/react/mocks/dlc'
import { makeStyles } from '@material-ui/core/styles'
import {
  sheetDataSelector,
  transformResultSelector
} from '../../store/selectors'
import { useSelector } from 'react-redux'
import { exportButtons } from '../../constants'
import React from 'react'
import { copyToClipboard } from '@cjo3/shared/react/helpers'
import { buildCopyData } from '@cjo3/shared/logic/dlc'

const useStyles = makeStyles(theme => ({
  ExportPanel_container: {
    ...theme.custom.borderRadius,
    padding: theme.custom.setSpace('sm'),
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.secondary.main,
      theme.palette.secondary[300]
    ),
    color: theme.palette.secondary[50],
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.custom.setSpace('sm')
    }
  },
  ExportPanel_topMargin: {
    marginTop: theme.custom.setSpace('sm')
  }
}))

export const ExportPanel: React.FC = (): JSX.Element => {
  const classes = useStyles()

  let transformResult = useSelector(transformResultSelector)
  let sheetData = useSelector(sheetDataSelector)

  // if (process.env.USE_MOCKS) {
  //   sheetData = sheetDataMock
  //   transformResult = transformResultMock
  // }

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    switch (event.currentTarget.name) {
      case exportButtons[0].name:
        const copyData = buildCopyData(sheetData, transformResult)
        copyToClipboard(copyData)
        alert('copied')
        break
      case exportButtons[1].name:
        break
      case exportButtons[1].name:
        break
    }
  }
  return (
    <Grid item xs={12} sm={6} className={classes.ExportPanel_container}>
      <Typography variant="h5">Export Options</Typography>
      <Typography variant="body1">
        Copy or download your transformed sheet for only $
        {process.env.EXPORT_PRICE}
      </Typography>
      <ButtonGroup className={classes.ExportPanel_topMargin}>
        {exportButtons.map(item => (
          <Button
            key={item.key}
            type="button"
            name={item.name}
            onClick={clickHandler}>
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
    </Grid>
  )
}
