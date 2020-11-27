import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { ExportData } from '../../../store/converter/interfaces'
import { PaymentDialog } from './PaymentDialog'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

interface Props {
  open: boolean
  closeHandler: () => void
  exportData: ExportData
}

export const PaymentApp: React.FC<Props> = ({
  open,
  closeHandler,
  exportData
}): JSX.Element => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentDialog
        open={open}
        closeHandler={closeHandler}
        exportData={exportData}
      />
    </Elements>
  )
}
