import clsx from 'clsx'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement
} from '@stripe/react-stripe-js'
import { FormikCardElement } from './FormikCardElement'
import {
  Button,
  Dialog,
  FormHelperText,
  Grid,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  InputLabel,
  FormControl
} from '@material-ui/core'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form, useFormik, Field } from 'formik'
import { PaymentFormSchema } from './validationSchemas'
import { FormikField } from './FormikField'
import { FormikAcceptTerms } from './FormikAcceptTerms'
import React from 'react'

const useStyles = makeStyles(theme => ({
  PaymentDialog_container: {
    padding: theme.custom.setSpace('sm')
  },
  PaymentDialog_form: {
    ...theme.custom.setGrid(2, 'auto', theme.custom.setSpace('sm')),
    marginTop: theme.custom.setSpace('sm'),
    width: '100%'
  },
  PaymentDialog_grid1: {
    gridColumn: '1 / 3',
    gridRow: 1
  },
  PaymentDialog_grid2: {
    gridColumn: '1 / 2',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 3'
    }
  },
  PaymentDialog_grid3: {
    gridColumn: '2 / 3',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 3',
      gridRow: 3
    }
  },
  PaymentDialog_grid4: {
    gridColumn: '1 / 3',
    gridRow: 3,
    [theme.breakpoints.down('xs')]: {
      gridRow: 4
    }
  },
  PaymentDialog_grid5: {
    gridColumn: '1 / 3',
    gridRow: 4,
    [theme.breakpoints.down('xs')]: {
      gridRow: 5
    }
  },
  PaymentDialog_grid6: {
    ...theme.custom.setFlex(),
    gridColumn: '1 / 3',
    gridRow: 5,
    [theme.breakpoints.down('xs')]: {
      gridRow: 6
    }
  },
  PaymentDialog_actionButton: {
    'width': '100%',
    'marginRight': theme.custom.setSpace(),
    '&:last-child': {
      marginRight: 0
    }
  },
  PaymentDialog_submitButton: {
    color: theme.palette.primary[50]
  }
}))

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

  const cardElementInitialValue = {
    status: false,
    message: 'Required'
  }

  const initialValues = {
    cardNumber: cardElementInitialValue,
    cardExpiry: cardElementInitialValue,
    cardCvc: cardElementInitialValue,
    billingEmail: '',
    acceptTerms: false
  }

  const submitHandler = (values, actions) => {
    console.log(
      '%c submitHandler',
      'color: yellow; font-size: large',
      values,
      actions,
      stripe,
      elements
    )
  }

  const resetHandler = (event, resetForm) => {
    if (!elements) return null
    elements?._elements.forEach(element => element.clear())
    resetForm(initialValues)
  }

  return (
    <Dialog open={open}>
      <Grid container className={classes.PaymentDialog_container}>
        <Typography variant="h3">Payment</Typography>
        <Typography variant="body1">
          Magna et aliquyam amet no dolores ipsum diam elitr et ea, sadipscing
          sadipscing justo eirmod dolores, accusam dolor labore ipsum.
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={PaymentFormSchema}>
          {({ isValid, isSubmitting, dirty, setValues, ...props }) => (
            <Form className={classes.PaymentDialog_form}>
              <div className={classes.PaymentDialog_grid1}>
                <FormikCardElement name="cardNumber" label="Card Number" />
              </div>
              <div className={classes.PaymentDialog_grid2}>
                <FormikCardElement name="cardExpiry" label="Card Expiry" />
              </div>
              <div className={classes.PaymentDialog_grid3}>
                <FormikCardElement name="cardCvc" label="Card CVC" />
              </div>
              <FormikField
                id="billingEmail"
                label="Email for Receipt"
                name="billingEmail"
                placeholder="Email Address"
                helperMessage="No receipt if left blank"
                style={classes.PaymentDialog_grid4}
              />
              <div className={classes.PaymentDialog_grid5}>
                <FormikAcceptTerms />
              </div>
              <Grid className={classes.PaymentDialog_grid6}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting || !isValid || !dirty}
                  className={clsx(
                    classes.PaymentDialog_actionButton,
                    classes.PaymentDialog_submitButton
                  )}>
                  Purchase
                </Button>
                <Button
                  type="button"
                  color="secondary"
                  disabled={!dirty}
                  variant="contained"
                  onClick={event => {
                    resetHandler(event, props.resetForm)
                  }}
                  className={classes.PaymentDialog_actionButton}>
                  Reset
                </Button>
                <Button
                  type="button"
                  onClick={closeHandler}
                  variant="outlined"
                  className={classes.PaymentDialog_actionButton}>
                  Cancel
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Dialog>
  )
}
