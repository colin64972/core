import { writeWorkbook } from '@cjo3/shared/logic/dlc'
import {
  currentSheetName as currentSheetNameMock,
  sheetData as sheetDataMock,
  transformResult as transformResultMock,
  workbookName as workbookNameMock
} from '@cjo3/shared/react/mocks/dlc'
import { Button, ButtonGroup, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { exportButtons } from '../../constants'
import { openSnackbar } from '../../store/app/actions'
import { ExportData } from '../../store/editor/interfaces'
import {
  currentSheetNameSelector,
  sheetDataSelector,
  transformResultSelector,
  workbookNameSelector
} from '../../store/selectors'
import { PaymentDialog } from './PaymentDialog/'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

const useStyles = makeStyles(theme => ({
  ExportPanel_container: {
    ...theme.custom.borderRadius,
    'padding': theme.custom.setSpace('sm'),
    'background': theme.custom.setLinearGradient(
      180,
      theme.palette.secondary.main,
      theme.palette.secondary[300]
    ),
    'color': theme.palette.secondary[50],
    'transition': 'all 250ms ease-out',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.custom.setSpace('sm')
    },
    '&:hover': {
      boxShadow: theme.custom.boxShadow
    }
  },
  ExportPanel_topMargin: {
    marginTop: theme.custom.setSpace('sm')
  }
}))

export const ExportPanel: React.FC = (): JSX.Element => {
  const classes = useStyles()

  let workbookName = useSelector(workbookNameSelector)
  let currentSheetName = useSelector(currentSheetNameSelector)
  let sheetData = useSelector(sheetDataSelector)
  let transformResult = useSelector(transformResultSelector)

  if (process.env.USE_MOCKS) {
    workbookName = workbookNameMock
    currentSheetName = currentSheetNameMock
    sheetData = sheetDataMock
    transformResult = transformResultMock
  }

  const dispatch = useDispatch()

  const [paymentOpen, setPaymentOpen] = useState<boolean>(false)
  const [exportData, setExportData] = useState<ExportData | null>(null)

  const openPaymentHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    try {
      const wbBuffer = writeWorkbook(
        sheetData,
        transformResult.all,
        currentSheetName,
        event.currentTarget.dataset.booktype
      )

      const fileName = `${workbookName}-edited.${event.currentTarget.name}`

      const blob: Blob = new Blob([wbBuffer], {
        type: 'application/octet-stream'
      })

      setExportData({
        fileName,
        blob
      })
      setPaymentOpen(true)
    } catch (error) {
      dispatch(
        openSnackbar(
          'Sorry, file export cannot be processed at this time',
          'error'
        )
      )
    }
  }

  const closePaymentHandler = (): void => {
    setExportData(null)
    setPaymentOpen(false)
  }

  return (
    <Grid item xs={12} sm={6} className={classes.ExportPanel_container}>
      {paymentOpen && (
        <Elements stripe={stripePromise}>
          <PaymentDialog
            open={paymentOpen}
            closeHandler={closePaymentHandler}
            exportData={exportData}
          />
        </Elements>
      )}
      <Typography variant="h5">
        Export for only ${process.env.EXPORT_PRICE}
      </Typography>
      <Typography variant="body1">
        Download your transformed sheet after purchase by selecting a file type
        below. If your sheet cannot be exported, we will let you know before
        checkout. Also, we do not save copies of exported sheets so please be
        careful with them after download!
      </Typography>
      <ButtonGroup className={classes.ExportPanel_topMargin}>
        {exportButtons.map(item => (
          <Button
            key={item.key}
            type="button"
            name={item.name}
            data-booktype={item.bookType}
            onClick={openPaymentHandler}>
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
    </Grid>
  )
}
