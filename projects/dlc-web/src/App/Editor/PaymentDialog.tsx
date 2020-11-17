import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from '@material-ui/core'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form, useFormik, Field } from 'formik'
import { FormikField } from './FormikField'
import React from 'react'

const useStyles = makeStyles(theme => ({}))

interface Props {
  open: boolean
  closeHandler: (event: React.MouseEvent) => void
}

export const PaymentDialog: React.FC<Props> = ({
  open,
  closeHandler
}): JSX.Element => {
  const classes = useStyles()

  const stripe = useStripe()
  const elements = useElements()

  const initialValues = {
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
    billingEmail: '',
    acceptTerms: false
  }

  const submitHandler = (values, actions) => {
    console.log(
      '%c submitHandler',
      'color: yellow; font-size: large',
      values,
      actions
    )
  }

  return (
    <Dialog open={open}>
      <DialogTitle id="export-payment-dialog">Export Payment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your transformed sheet will download upon succesful payment!
        </DialogContentText>
        <Formik initialValues={initialValues} onSubmit={submitHandler}>
          {props => {
            console.log(
              '%c form props',
              'color: purple; font-size: large',
              props
            )
            return (
              <Form>
                <Field name="asdf">
                  {props => {
                    console.log(
                      '%c field props',
                      'color: gold; font-size: large',
                      props
                    )
                    return (
                      <div>
                        <label>{props.field.name}</label>
                        <input {...props.field} />
                      </div>
                    )
                  }}
                </Field>
              </Form>
            )
          }}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={closeHandler} color="primary">
          Purchase
        </Button>
        <Button type="button" onClick={closeHandler} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
