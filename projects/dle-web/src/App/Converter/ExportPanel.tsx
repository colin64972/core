import { writeWorkbook } from '@cjo3/shared/logic/dle'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { LoadFail } from '@cjo3/shared/react/components/LoadFail'
import Loadable from 'react-loadable'
import { saveAs } from 'file-saver'
import { Button, ButtonGroup, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { exportButtons } from '../../constants'
import { openSnackbar } from '../../store/app/actions'
import { ExportData } from '../../store/converter/interfaces'
import {
  currentSheetNameSelector,
  sheetDataSelector,
  transformResultSelector,
  workbookNameSelector
} from '../../store/selectors'

const PaymentAppLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-PaymentApp" */
      /* webpackPrefetch: false */
      './PaymentApp/'
    ),
  loading: ({ error, pastDelay, timedOut }) => {
    if (error) return <LoadFail message="Load Failed" />
    if (timedOut) return <LoadFail message="Timed Out" />
    if (pastDelay) return <BackDropScreen isOpen spinner />
    return null
  },
  delay: 250,
  timeout: 5000,
  render: (loaded, props) => {
    const Component = loaded.PaymentApp
    return <Component {...props} />
  }
})

const useStyles = makeStyles(
  theme => ({
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
  }),
  {
    name: 'ExportPanel'
  }
)

export const ExportPanel: React.FC = (): JSX.Element => {
  const classes = useStyles()

  const workbookName = useSelector(workbookNameSelector)
  const currentSheetName = useSelector(currentSheetNameSelector)
  const sheetData = useSelector(sheetDataSelector)
  const transformResult = useSelector(transformResultSelector)

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
      if (process.env.PAYMENT_DISABLED) {
        saveAs(blob, fileName)
        dispatch(
          openSnackbar('File exported. Thank you for trying DLE!', 'success')
        )
      } else {
        setPaymentOpen(true)
      }
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
    <Grid className={classes.ExportPanel_container}>
      {paymentOpen && (
        <PaymentAppLoadable
          open={paymentOpen}
          closeHandler={closePaymentHandler}
          exportData={exportData}
        />
      )}
      <Typography variant="h5">
        {process.env.PAYMENT_DISABLED
          ? 'Export for Free until 2021'
          : `Export for Only ${process.env.EXPORT_PRICE}`}
      </Typography>
      <Typography variant="body1">
        {process.env.PAYMENT_DISABLED
          ? 'In order to help us alpha test this app, we are inviting users to export sheets at no charge until the New Year. Download your sheet and feel free to send us your feedback or feature requests.'
          : "If you'd like to save a copy of your transformed sheet, you can purchase a sheet export here. Simply click on the file type you would like to receive and enter your payment details. Your download will be sent immediately. Please be careful with your file exports after download as we do not save copies of client data."}
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
