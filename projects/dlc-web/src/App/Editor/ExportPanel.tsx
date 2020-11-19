import { exportFile } from '@cjo3/shared/logic/dlc'
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
import { useSelector } from 'react-redux'
import { exportButtons } from '../../constants'
import { ExportType } from '../../store/editor/interfaces'
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

  const [paymentOpen, setPaymentOpen] = useState<boolean>(false)
  const [exportType, setExportType] = useState<ExportType | null>(null)

  const openPaymentHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setExportType({
      bookType: event.currentTarget.dataset.booktype,
      name: event.currentTarget.name
    })
    setPaymentOpen(true)
  }

  const closePaymentHandler = (): void => {
    setExportType(null)
    setPaymentOpen(false)
  }

  const sendExport = (name: string, bookType: string) => {
    try {
      return exportFile(
        sheetData,
        transformResult.all,
        currentSheetName,
        workbookName,
        bookType,
        name
      )
    } catch (error) {
      throw error
    }
  }

  return (
    <Grid item xs={12} sm={6} className={classes.ExportPanel_container}>
      {paymentOpen && (
        <Elements stripe={stripePromise}>
          <PaymentDialog
            open={paymentOpen}
            closeHandler={closePaymentHandler}
            sendExport={sendExport}
            exportType={exportType}
          />
        </Elements>
      )}
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
            data-booktype={item.bookType}
            onClick={openPaymentHandler}>
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
    </Grid>
  )
}
