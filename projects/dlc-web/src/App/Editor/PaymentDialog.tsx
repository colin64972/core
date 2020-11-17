import {
  Button,
  Dialog,
  Grid,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from '@material-ui/core'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form, useFormik, Field } from 'formik'
import { PaymentFormSchema } from './validationSchemas'
import { FormikField } from './FormikField'
import React from 'react'

const useStyles = makeStyles(theme => ({
  PaymentDialog_container: {
    padding: theme.custom.setSpace('sm')
  },
  PaymentDialog_form: {
    ...theme.custom.setGrid(2, 'auto', theme.custom.setSpace()),
    width: '100%',
    marginTop: theme.custom.setSpace('sm')
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
    ...theme.custom.setFlex(),
    gridColumn: '1 / 3',
    gridRow: 4,
    marginTop: theme.custom.setSpace(),
    [theme.breakpoints.down('xs')]: {
      gridRow: 5
    }
  },
  PaymentDialog_actionButton: {
    'width': '100%',
    'marginRight': theme.custom.setSpace(),
    '&:last-child': {
      marginRight: 0
    }
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
          {props => {
            console.log(
              '%c form props',
              'color: purple; font-size: large',
              props
            )
            return (
              <Form className={classes.PaymentDialog_form}>
                <FormikField
                  id="billingEmail"
                  label="Email for Receipt"
                  name="billingEmail"
                  placeholder="Email Address"
                  helperMessage="No receipt if left blank"
                  style={classes.PaymentDialog_grid1}
                />
                <FormikField
                  id="billingEmail"
                  label="Email for Receipt"
                  name="billingEmail"
                  placeholder="Email Address"
                  helperMessage="No receipt if left blank"
                  style={classes.PaymentDialog_grid2}
                />
                <FormikField
                  id="billingEmail"
                  label="Email for Receipt"
                  name="billingEmail"
                  placeholder="Email Address"
                  helperMessage="No receipt if left blank"
                  style={classes.PaymentDialog_grid3}
                />
                <FormikField
                  id="billingEmail"
                  label="Email for Receipt"
                  name="billingEmail"
                  placeholder="Email Address"
                  helperMessage="No receipt if left blank"
                  style={classes.PaymentDialog_grid4}
                />
                <Grid className={classes.PaymentDialog_grid5}>
                  <Button
                    type="button"
                    onClick={closeHandler}
                    color="primary"
                    variant="contained"
                    className={classes.PaymentDialog_actionButton}>
                    Purchase
                  </Button>
                  <Button
                    type="button"
                    onClick={closeHandler}
                    color="primary"
                    variant="contained"
                    className={classes.PaymentDialog_actionButton}>
                    Reset
                  </Button>
                  <Button
                    type="button"
                    onClick={closeHandler}
                    color="primary"
                    variant="contained"
                    className={classes.PaymentDialog_actionButton}>
                    Cancel
                  </Button>
                </Grid>
              </Form>
            )
          }}
        </Formik>
      </Grid>
    </Dialog>
  )
}
